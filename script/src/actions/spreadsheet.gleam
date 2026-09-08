import gleam/io
import gleam/int
import ffi/properties
import ffi/spreadsheet
import ffi/date
import parser.{type ParseResult}
import formatters
import types

pub type ActionError {
  SpreadsheetError(String)
}

pub fn get_sheet_url() -> String {
  case properties.get_script_property("SPREADSHEET_URL") {
    Ok(url) -> url
    Error(_) -> ""
  }
}

pub fn run(
  parse_result: ParseResult,
  message_id: String,
  message_from: String,
  message_date: String,
  label_raw: String,
) -> Result(Nil, ActionError) {
  io.println("Executing SpreadSheet Action")

  let sheet_url = get_sheet_url()
  case sheet_url {
    "" -> Error(SpreadsheetError("SPREADSHEET_URL not set"))
    _ -> {
      case spreadsheet.open_by_url(sheet_url) {
        Error(_) -> Error(SpreadsheetError("Could not open spreadsheet"))
        Ok(file) -> {
          let sheet = spreadsheet.get_active_sheet(file)

          let date_str = formatters.format_date(
            formatters.timestamp_to_string(parse_result.date.timestamp),
            "YYYY-MM-DDTHH:mm:ssZ",
            "YYYY-MM-DD",
          )

          let time_str = formatters.format_date(
            formatters.timestamp_to_string(parse_result.date.timestamp),
            "YYYY-MM-DDTHH:mm:ssZ",
            "HH:mm",
          )

          let created_at = formatters.timestamp_to_string(date.now())

          let row = [
            message_id,
            message_from,
            int.to_string(parse_result.amount),
            parse_result.currency.code,
            parse_result.context,
            parse_result.account,
            date_str,
            time_str,
            types.to_string(parse_result.type_),
            label_raw,
            parse_result.entity,
            parse_result.comment,
            created_at,
            message_date,
            "{}",
            int.to_string(date.now()),
          ]

          io.println("Saving data")
          case spreadsheet.append_row(sheet, row) {
            Ok(Nil) -> {
              io.println("Data saved successfully")
              Ok(Nil)
            }
            Error(_) -> Error(SpreadsheetError("Could not append row"))
          }
        }
      }
    }
  }
}
