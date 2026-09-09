import ffi/gmail.{type GmailLabel, type GmailMessage, type GmailThread}
import gleam/int
import gleam/io
import gleam/list
import gleam/string
import query.{type QueryBuilder}

pub type FormattedMessage {
  FormattedMessage(
    id: String,
    subject: String,
    body: String,
    from: String,
    date: String,
    is_unread: Bool,
    labels: List(FormattedLabel),
    message: GmailMessage,
  )
}

pub type FormattedLabel {
  FormattedLabel(name: String, label: GmailLabel)
}

pub type SearchResult {
  SearchResult(
    threads: List(GmailThread),
    messages: List(FormattedMessage),
    labels: List(FormattedLabel),
    item: String,
  )
}

pub fn search(
  builder: QueryBuilder,
  start: Int,
  max: Int,
) -> List(SearchResult) {
  let queries = builder.queries
  list.flat_map(queries, fn(query_str) {
    io.println("Searching for " <> query_str)
    case gmail.search(query_str, start, max) {
      // case gmail.search(query_str, start, max) {
      Ok(threads) -> {
        io.println(string.append(
          "Found ",
          int.to_string(list.length(threads)) <> " threads",
        ))
        let all_labels =
          list.flat_map(threads, fn(thread) {
            let labels = gmail.get_labels(thread)
            list.map(labels, fn(l) {
              io.println("label: " <> gmail.get_label_name(l))
              FormattedLabel(name: gmail.get_label_name(l), label: l)
            })
          })
        let all_messages =
          list.flat_map(threads, fn(thread) {
            let messages = gmail.get_messages(thread)
            list.map(messages, fn(msg) { format_message(msg, builder) })
          })
        [
          SearchResult(
            threads: threads,
            messages: all_messages,
            labels: all_labels,
            item: query_str,
          ),
        ]
      }
      Error(_) -> {
        io.println("Search error")
        []
      }
    }
  })
}

fn format_message(
  message: GmailMessage,
  _builder: QueryBuilder,
) -> FormattedMessage {
  let thread = gmail.get_thread(message)
  let labels = gmail.get_labels(thread)
  let formatted_labels =
    list.map(labels, fn(l) {
      FormattedLabel(name: gmail.get_label_name(l), label: l)
    })
  FormattedMessage(
    id: gmail.get_id(message),
    subject: gmail.get_subject(message),
    body: gmail.get_body(message),
    from: gmail.get_from(message),
    date: gmail.get_date(message),
    is_unread: gmail.is_unread(message),
    labels: formatted_labels,
    message: message,
  )
}

pub fn mark_as_read(message: GmailMessage) -> Nil {
  io.println("Marking message as read")
  gmail.mark_message_read(message)
}
