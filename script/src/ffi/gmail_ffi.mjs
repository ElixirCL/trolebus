import {
  Result$Ok,
  Result$Error,
  toList,
} from "../gleam.mjs"
import {
  SearchError,
  LabelNotFound,
  ReadError,
} from "./gmail.mjs"

export function search(query, start, max) {
  try {
    let threads = GmailApp.search(query, start, max)
    let result = threads.map(t => t)
    return Result$Ok(toList(result))
  } catch (error) {
    return Result$Error(new SearchError(error.toString()))
  }
}

export function get_messages(thread) {
  let messages = thread.getMessages()
  return toList(messages.map(m => m))
}

export function get_labels(thread) {
  let labels = thread.getLabels()
  return toList(labels.map(l => l))
}

export function get_subject(message) {
  return message.getSubject()
}

export function get_body(message) {
  return message.getPlainBody()
}

export function get_from(message) {
  return message.getFrom()
}

export function get_date(message) {
  return message.getDate().toISOString()
}

export function get_id(message) {
  return message.getId()
}

export function is_unread(message) {
  return message.isUnread()
}

export function get_thread(message) {
  return message.getThread()
}

export function get_label_name(label) {
  return label.getName()
}

export function mark_message_read(message) {
  GmailApp.markMessageRead(message)
}

export function get_user_label_by_name(name) {
  try {
    let label = GmailApp.getUserLabelByName(name)
    if (label === null) {
      return Result$Error(new LabelNotFound())
    }
    return Result$Ok(label)
  } catch (error) {
    return Result$Error(new ReadError(error.toString()))
  }
}
