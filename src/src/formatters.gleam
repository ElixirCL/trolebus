import ffi/date
import gleam/int
import gleam/result
import gleam/string

pub fn numeric(value: String) -> Int {
  value
  |> string.replace(each: ".", with: "")
  |> string.replace(each: ",", with: "")
  |> string.trim
  |> int.parse
  |> result.unwrap(0)
}

pub fn string(value: String) -> String {
  string.trim(value)
}

pub type DateResult {
  DateResult(raw: String, timestamp: Int)
}

pub fn date(raw: String, format fmt: String) -> DateResult {
  case date.parse_date(raw, fmt) {
    Ok(timestamp) -> DateResult(raw: raw, timestamp: timestamp)
    Error(_) -> DateResult(raw: raw, timestamp: 0)
  }
}

pub fn format_date(
  date_string: String,
  input_format: String,
  output_format: String,
) -> String {
  case date.format_date(date_string, input_format, output_format) {
    Ok(formatted) -> formatted
    Error(_) -> date_string
  }
}

pub fn timestamp_to_string(timestamp: Int) -> String {
  date.from_timestamp(timestamp)
}
