import gleam/string

pub const donation = "deposit:cl-bancoestado:donation-notifications"

pub const transfer = "deposit:cl-bancoestado:transfer-notifications"

pub const purchase = "expense:cl-bancoestado:purchase-notifications"

pub type Label {
  Label(
    raw: String,
    formatted: String,
    key: String,
    query: String,
  )
}

pub fn for_query(label: String) -> Label {
  let prefix = "trolebus"
  let formatted =
    label
    |> string.replace(each: " ", with: "+")
    |> string.lowercase
  let key = prefix <> "/" <> formatted
  let query = prefix <> "/" <> formatted
  Label(raw: label, formatted: formatted, key: key, query: query)
}
