import gleam/list
import gleeunit
import parsers/banco_chile
import types

pub fn main() -> Nil {
  gleeunit.main()
}

fn make_html(name: String, rows: List(#(String, String))) -> String {
  let body =
    list.fold(rows, "", fn(acc, row) {
      let #(label, value) = row
      acc <> "<tr><td>" <> label <> "</td><td>" <> value <> "</td></tr>"
    })

  "<html><body><h1>Estimado(a) "
  <> name
  <> "</h1><table><tbody>"
  <> body
  <> "</tbody></table></body></html>"
}

fn base_rows() -> List(#(String, String)) {
  [
    #("Rut", "11.111.111-1"),
    #("Cuenta de Cargo", "Cuenta Corriente"),
    #("Mail", "juan@example.com"),
    #("Fecha", "05/08/2026"),
    #("Cuenta", "12345678"),
    #("N° de Cuenta", "87654321"),
    #("Monto Pagado", "$1.500"),
    #("ID", "TX-12345"),
  ]
}

pub fn parse_full_email_test() {
  let result = banco_chile.parse(make_html("Juan Pérez", base_rows()))

  assert result.amount == 1500
  assert result.account == "87654321"
  assert result.context == "Cuenta Corriente 12345678"
  assert result.comment == "Juan Pérez <juan@example.com>"
  assert result.name == "Banco Chile"
  assert result.entity == "cl.bancochile"
  assert result.type_ == types.Expense
  assert result.label == "expense:cl-bancochile:payment-notifications"
  assert result.currency.code == "CLP"
  assert result.date.raw == "05/08/2026"
  assert result.date.timestamp > 0
  assert result.parsed
}

pub fn parse_falls_back_to_cuenta_test() {
  let rows =
    base_rows()
    |> list.filter(fn(row) { row.0 != "N° de Cuenta" })

  let result = banco_chile.parse(make_html("Ana Soto", rows))

  assert result.account == "12345678"
  assert result.amount == 1500
  assert result.comment == "Ana Soto <juan@example.com>"
  assert result.parsed
}

pub fn parse_empty_html_test() {
  let result = banco_chile.parse("")

  assert result.amount == 0
  assert result.account == ""
  assert result.context == "Banco Chile"
  assert result.name == "Banco Chile"
  assert result.entity == "cl.bancochile"
  assert result.type_ == types.Expense
  assert result.date.raw == ""
  assert result.date.timestamp == 0
  assert result.parsed == False
}

pub fn parse_missing_amount_test() {
  let rows =
    base_rows()
    |> list.filter(fn(row) { row.0 != "Monto Pagado" })

  let result = banco_chile.parse(make_html("Juan Pérez", rows))

  assert result.amount == 0
  assert result.parsed == False
}
