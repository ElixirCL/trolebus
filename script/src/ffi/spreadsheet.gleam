pub type Spreadsheet

pub type Sheet

pub type SpreadsheetError {
  OpenError(String)
  WriteError(String)
}

@external(javascript, "./spreadsheet_ffi.mjs", "open_by_url")
pub fn open_by_url(url: String) -> Result(Spreadsheet, SpreadsheetError)

@external(javascript, "./spreadsheet_ffi.mjs", "get_active_sheet")
pub fn get_active_sheet(spreadsheet: Spreadsheet) -> Sheet

@external(javascript, "./spreadsheet_ffi.mjs", "append_row")
pub fn append_row(
  sheet: Sheet,
  row: List(String),
) -> Result(Nil, SpreadsheetError)
