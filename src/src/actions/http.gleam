import ffi/date
import ffi/properties
import formatters
import gleam/io
import gleam/json
import parser.{type ParseResult}

pub type ActionError {
  HttpError(String)
}

pub fn get_endpoint() -> String {
  case properties.get_script_property("HTTP_ENDPOINT") {
    Ok(url) -> url
    Error(_) -> ""
  }
}

pub fn run(
  parse_result: ParseResult,
  message_id: String,
  label_raw: String,
  message_date: String,
) -> Result(Nil, ActionError) {
  io.println("Executing HTTP Action")

  let endpoint = get_endpoint()
  case endpoint {
    "" -> {
      io.println("HTTP_ENDPOINT not set, skipping")
      Ok(Nil)
    }
    _ -> {
      let date_str =
        formatters.format_date(
          formatters.timestamp_to_string(parse_result.date.timestamp),
          "YYYY-MM-DDTHH:mm:ssZ",
          "YYYY-MM-DD",
        )

      let time_str =
        formatters.format_date(
          formatters.timestamp_to_string(parse_result.date.timestamp),
          "YYYY-MM-DDTHH:mm:ssZ",
          "HH:mm",
        )

      let ts = date.now()

      let _payload =
        json.object([
          #("id", json.string(message_id)),
          #("label", json.string(label_raw)),
          #("date", json.string(date_str)),
          #("time", json.string(time_str)),
          #("message_date", json.string(message_date)),
          #("ts", json.int(ts)),
        ])

      io.println("Payload prepared")

      Ok(Nil)
    }
  }
}
