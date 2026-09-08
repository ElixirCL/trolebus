pub type GmailThread

pub type GmailMessage

pub type GmailLabel

pub type GmailError {
  SearchError(String)
  LabelNotFound
  ReadError(String)
}

@external(javascript, "./gmail_ffi.mjs", "search")
pub fn search(
  query: String,
  start: Int,
  max: Int,
) -> Result(List(GmailThread), GmailError)

@external(javascript, "./gmail_ffi.mjs", "get_messages")
pub fn get_messages(thread: GmailThread) -> List(GmailMessage)

@external(javascript, "./gmail_ffi.mjs", "get_labels")
pub fn get_labels(thread: GmailThread) -> List(GmailLabel)

@external(javascript, "./gmail_ffi.mjs", "get_subject")
pub fn get_subject(message: GmailMessage) -> String

@external(javascript, "./gmail_ffi.mjs", "get_body")
pub fn get_body(message: GmailMessage) -> String

@external(javascript, "./gmail_ffi.mjs", "get_from")
pub fn get_from(message: GmailMessage) -> String

@external(javascript, "./gmail_ffi.mjs", "get_date")
pub fn get_date(message: GmailMessage) -> String

@external(javascript, "./gmail_ffi.mjs", "get_id")
pub fn get_id(message: GmailMessage) -> String

@external(javascript, "./gmail_ffi.mjs", "is_unread")
pub fn is_unread(message: GmailMessage) -> Bool

@external(javascript, "./gmail_ffi.mjs", "get_thread")
pub fn get_thread(message: GmailMessage) -> GmailThread

@external(javascript, "./gmail_ffi.mjs", "get_label_name")
pub fn get_label_name(label: GmailLabel) -> String

@external(javascript, "./gmail_ffi.mjs", "mark_message_read")
pub fn mark_message_read(message: GmailMessage) -> Nil

@external(javascript, "./gmail_ffi.mjs", "get_user_label_by_name")
pub fn get_user_label_by_name(
  name: String,
) -> Result(GmailLabel, GmailError)
