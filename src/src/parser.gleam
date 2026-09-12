import currency
import gleam/list
import gleam/option
import gleam/regexp
import types

pub type DateInfo {
  DateInfo(raw: String, timestamp: Int)
}

pub type Meta {
  Meta(
    from: String,
    to: String,
    rut: String,
    entity: String,
    transaction: String,
  )
}

pub fn empty_meta() -> Meta {
  Meta(from: "", to: "", rut: "", entity: "", transaction: "")
}

pub type ParseResult {
  ParseResult(
    amount: Int,
    context: String,
    account: String,
    date: DateInfo,
    name: String,
    entity: String,
    type_: types.TransactionType,
    label: String,
    currency: currency.Currency,
    comment: String,
    meta: Meta,
    parsed: Bool,
  )
}

pub fn empty_result(
  entity_name entity_name: String,
  transaction_type tt: types.TransactionType,
  label lbl: String,
  currency curr: currency.Currency,
) -> ParseResult {
  ParseResult(
    amount: 0,
    context: "",
    account: "",
    date: DateInfo(raw: "", timestamp: 0),
    name: "",
    entity: entity_name,
    type_: tt,
    label: lbl,
    currency: curr,
    comment: "",
    meta: empty_meta(),
    parsed: False,
  )
}

pub fn get_groups(pattern: String, text: String) -> List(String) {
  let assert Ok(re) = regexp.from_string(pattern)
  regexp.scan(with: re, content: text)
  |> list.flat_map(fn(m) {
    let sub = list.filter_map(m.submatches, fn(s) { option.to_result(s, Nil) })
    [m.content, ..sub]
  })
}

pub fn get_group(pattern: String, text: String, index: Int) -> String {
  let groups = get_groups(pattern, text)
  case list.drop(groups, index) |> list.first() {
    Ok(value) -> value
    Error(_) -> ""
  }
}
