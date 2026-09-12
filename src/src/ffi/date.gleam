pub type Date

pub type DateError {
  ParseError(String)
}

@external(javascript, "./date_ffi.mjs", "now")
pub fn now() -> Int

@external(javascript, "./date_ffi.mjs", "parse_date")
pub fn parse_date(date_string: String, format: String) -> Result(Int, DateError)

@external(javascript, "./date_ffi.mjs", "format_date")
pub fn format_date(
  date_string: String,
  input_format: String,
  output_format: String,
) -> Result(String, DateError)

@external(javascript, "./date_ffi.mjs", "from_timestamp")
pub fn from_timestamp(timestamp: Int) -> String
