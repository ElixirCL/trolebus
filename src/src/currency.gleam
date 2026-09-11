import gleam/int
import gleam/list
import gleam/string

pub type Currency {
  Currency(
    name: String,
    symbol: String,
    code: String,
    country: String,
    locale: String,
    decimals: Int,
  )
}

pub fn clp() -> Currency {
  Currency(
    name: "Peso Chileno",
    symbol: "$",
    code: "CLP",
    country: "Chile",
    locale: "es-CL",
    decimals: 0,
  )
}

pub fn format(
  currency curr: Currency,
  value val: Int,
  include_symbol include_symbol: Bool,
  include_code include_code: Bool,
) -> String {
  let symbol_part = case include_symbol {
    True -> curr.symbol <> " "
    False -> ""
  }
  let code_part = case include_code {
    True -> " " <> curr.code
    False -> ""
  }
  let formatted =
    val
    |> int.to_string
    |> string.reverse
    |> string.to_graphemes
    |> list.index_map(fn(char, i) {
      case i > 0 && i % 3 == 0 {
        True -> "." <> char
        False -> char
      }
    })
    |> list.fold("", fn(acc, char) { acc <> char })
    |> string.reverse
  symbol_part <> formatted <> code_part
}
