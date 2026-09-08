import gleam/string

pub fn is_empty_string(value: String) -> Bool {
  value |> string.trim |> string.is_empty
}
