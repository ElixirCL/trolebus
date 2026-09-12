import actions/http
import actions/spreadsheet
import config.{type Config}
import currency
import entity
import gleam/int
import gleam/io
import gleam/list
import mailer.{type FormattedMessage, type SearchResult}
import parser.{type ParseResult}
import parsers/banco_chile
import query.{type QueryBuilder, type QueryElement}
import types

pub type ParsedEmail {
  ParsedEmail(
    message: FormattedMessage,
    info: ParseResult,
    element: QueryElement,
  )
}

pub fn get_emails(
  _config: Config,
  entities: List(entity.Entity),
) -> List(ParsedEmail) {
  let builder = query.new(entities)
  let results = mailer.search(builder, 0, 1)
  let emails =
    list.flat_map(results, fn(result) { process_search_result(result, builder) })
  let _ = io.println(int.to_string(list.length(emails)) <> " emails parsed")
  emails
}

fn process_search_result(
  result: SearchResult,
  builder: QueryBuilder,
) -> List(ParsedEmail) {
  list.filter_map(result.messages, fn(message) {
    process_message(message, builder)
  })
}

fn process_message(
  message: FormattedMessage,
  builder: QueryBuilder,
) -> Result(ParsedEmail, Nil) {
  case message.is_unread {
    False -> Error(Nil)
    True -> {
      let label_names = list.map(message.labels, fn(l) { l.name })
      case query.element_for_labels(builder, label_names) {
        Error(_) -> Error(Nil)
        Ok(element) -> {
          let info = parse_email(message, element)
          case info.parsed {
            False -> {
              let _ = io.println("Could not parse email")
              mailer.mark_as_read(message.message)
              Error(Nil)
            }
            True -> {
              let _ = io.println("Email parsed successfully")
              Ok(ParsedEmail(message: message, info: info, element: element))
            }
          }
        }
      }
    }
  }
}

fn parse_email(
  message: FormattedMessage,
  element: QueryElement,
) -> ParseResult {
  case element.entity.id {
    "cl.bancochile" -> banco_chile.parse(message.body)
    _ ->
      parser.empty_result(
        entity_name: element.entity.name,
        transaction_type: types.Expense,
        label: element.label.raw,
        currency: currency.clp(),
      )
  }
}

pub fn run_actions(emails: List(ParsedEmail), _config: Config) -> Nil {
  list.each(emails, fn(email) {
    let _ = io.println("Running actions for email")
    run_spreadsheet_action(email)
    run_http_action(email)
    mailer.mark_as_read(email.message.message)
  })
}

fn run_spreadsheet_action(email: ParsedEmail) -> Nil {
  case
    spreadsheet.run(
      email.info,
      email.message.id,
      email.message.from,
      email.message.date,
      email.element.label.raw,
    )
  {
    Ok(Nil) -> io.println("Spreadsheet action completed")
    Error(_) -> io.println("Spreadsheet action failed")
  }
  Nil
}

fn run_http_action(email: ParsedEmail) -> Nil {
  case
    http.run(
      email.info,
      email.message.id,
      email.element.label.raw,
      email.message.date,
    )
  {
    Ok(Nil) -> io.println("HTTP action completed")
    Error(_) -> io.println("HTTP action failed")
  }
  Nil
}
