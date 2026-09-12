import currency
import formatters
import gleam/int
import gleam/list
import gleam/result
import gleam/string
import mail_parser
import parser.{type DateInfo, type ParseResult, DateInfo, Meta, empty_result}
import types

pub const entity_id = "cl.bancochile"

pub const entity_name = "Banco Chile"

pub const label_purchase = "expense:cl-bancochile:payment-notifications"

pub fn parse(html_body: String) -> ParseResult {
  let result =
    empty_result(
      entity_name: entity_name,
      transaction_type: types.Expense,
      label: label_purchase,
      currency: currency.clp(),
    )

  let rows = mail_parser.parse_html_tables(html_body)

  let name = extract_name(html_body)
  let rut = mail_parser.get_value(rows, "Rut")
  let account_type = mail_parser.get_value(rows, "Cuenta de Cargo")
  let email = mail_parser.get_value(rows, "Mail")
  let date_str = mail_parser.get_value(rows, "Fecha")
  let account = mail_parser.get_value(rows, "Cuenta")
  let account_number = case mail_parser.get_value(rows, "N° de Cuenta") {
    "" -> account
    value -> value
  }
  let amount_str = mail_parser.get_value(rows, "Monto Pagado")
  let transaction_id = mail_parser.get_value(rows, "ID")

  let amount = parse_amount(amount_str)
  let date_info = parse_date(date_str)

  let context = case account_type, account {
    "", "" -> entity_name
    _, "" -> account_type
    _, _ -> account_type <> " " <> account
  }

  let comment = case name, email {
    "", "" -> ""
    _, "" -> name
    _, _ -> name <> " <" <> email <> ">"
  }

  parser.ParseResult(
    ..result,
    amount: amount,
    context: context,
    account: account_number,
    date: date_info,
    name: entity_name,
    entity: entity_id,
    comment: comment,
    meta: Meta(
      from: "",
      to: name,
      rut: rut,
      entity: entity_name,
      transaction: transaction_id,
    ),
    parsed: amount > 0,
  )
}

fn extract_name(html: String) -> String {
  let marker = "Estimado(a)"
  case string.contains(html, marker) {
    True -> {
      case string.split(html, marker) {
        [_, rest] -> {
          case string.split(rest, "</h1>") {
            [before, _] -> {
              before
              |> string.replace(each: ">", with: "")
              |> string.trim
            }
            _ -> ""
          }
        }
        _ -> ""
      }
    }
    False -> ""
  }
}

fn parse_amount(amount_str: String) -> Int {
  amount_str
  |> string.replace(each: "$", with: "")
  |> string.replace(each: ".", with: "")
  |> string.replace(each: ",", with: "")
  |> string.trim
  |> parse_int
  |> result.unwrap(0)
}

fn parse_int(s: String) -> Result(Int, Nil) {
  case s {
    "" -> Error(Nil)
    _ -> {
      case s |> string.to_graphemes |> list.first() {
        Ok("-") -> s |> string.drop_start(1) |> do_parse_int(True)
        _ -> do_parse_int(s, False)
      }
    }
  }
}

fn do_parse_int(s: String, negative: Bool) -> Result(Int, Nil) {
  case s |> int.parse {
    Ok(n) ->
      Ok(case negative {
        True -> 0 - n
        False -> n
      })
    Error(_) -> Error(Nil)
  }
}

fn parse_date(date_str: String) -> DateInfo {
  case date_str {
    "" -> DateInfo(raw: "", timestamp: 0)
    _ -> {
      let formatted = formatters.date(date_str, "DD/MM/YYYY")
      DateInfo(raw: date_str, timestamp: formatted.timestamp)
    }
  }
}
