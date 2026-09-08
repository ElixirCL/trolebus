import {
  Result$Ok,
  Result$Error
} from "../gleam.mjs"
import {
  OpenError,
  WriteError,
} from "./spreadsheet.mjs"

export function open_by_url(url) {
  try {
    let spreadsheet = SpreadsheetApp.openByUrl(url)
    return Result$Ok(spreadsheet)
  } catch (error) {
    return Result$Error(new OpenError(error.toString()))
  }
}

export function get_active_sheet(spreadsheet) {
  return spreadsheet.getActiveSheet()
}

export function append_row(sheet, row) {
  try {
    let array = []
    for (let item of row) {
      array.push(item)
    }
    sheet.appendRow(array)
    return Result$Ok(null)
  } catch (error) {
    return Result$Error(new WriteError(error.toString()))
  }
}
