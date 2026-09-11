import {
  Result$Ok,
  Result$Error,
} from "../gleam.mjs"
import {
  ParseError,
} from "./date.mjs"

function pad_zero(n) {
  return n < 10 ? "0" + n : String(n)
}

function format_token(date, token) {
  switch (token) {
    case "YYYY": return String(date.getFullYear())
    case "YY": return String(date.getFullYear()).slice(-2)
    case "MM": return pad_zero(date.getMonth() + 1)
    case "M": return String(date.getMonth() + 1)
    case "DD": return pad_zero(date.getDate())
    case "D": return String(date.getDate())
    case "HH": return pad_zero(date.getHours())
    case "H": return String(date.getHours())
    case "mm": return pad_zero(date.getMinutes())
    case "m": return String(date.getMinutes())
    case "ss": return pad_zero(date.getSeconds())
    case "s": return String(date.getSeconds())
    default: return token
  }
}

function parse_with_format(date_string, format) {
  let parts = {}
  let format_tokens = ["YYYY", "YY", "MM", "M", "DD", "D", "HH", "H", "mm", "m", "ss", "s"]
  let remaining = format
  let input = date_string

  for (let token of format_tokens) {
    if (remaining.includes(token)) {
      let idx = remaining.indexOf(token)
      remaining = remaining.slice(0, idx) + remaining.slice(idx + token.length)

      let regex
      if (token === "YYYY") regex = /(\d{4})/
      else if (token === "YY") regex = /(\d{2})/
      else if (token === "MM" || token === "DD" || token === "HH" || token === "mm" || token === "ss") regex = /(\d{2})/
      else regex = /(\d{1,2})/

      let match = input.slice(idx).match(regex)
      if (match) {
        let key
        switch (token) {
          case "YYYY": key = "year"; break
          case "YY": key = "year_short"; break
          case "MM": case "M": key = "month"; break
          case "DD": case "D": key = "day"; break
          case "HH": case "H": key = "hour"; break
          case "mm": case "m": key = "minute"; break
          case "ss": case "s": key = "second"; break
        }
        parts[key] = parseInt(match[1])
        input = input.slice(0, idx) + input.slice(idx + match[0].length)
      }
    }
  }

  let year = parts.year || (parts.year_short ? (parts.year_short > 68 ? 1900 + parts.year_short : 2000 + parts.year_short) : new Date().getFullYear())
  let month = (parts.month || (new Date().getMonth() + 1)) - 1
  let day = parts.day || 1
  let hour = parts.hour || 0
  let minute = parts.minute || 0
  let second = parts.second || 0

  return new Date(year, month, day, hour, minute, second)
}

export function now() {
  return Date.now()
}

export function parse_date(date_string, format) {
  try {
    let date = parse_with_format(date_string, format)
    if (isNaN(date.getTime())) {
      return Result$Error(new ParseError("Invalid date: " + date_string))
    }
    return Result$Ok(date.getTime())
  } catch (error) {
    return Result$Error(new ParseError(error.toString()))
  }
}

export function format_date(date_string, input_format, output_format) {
  try {
    let date = parse_with_format(date_string, input_format)
    if (isNaN(date.getTime())) {
      return Result$Error(new ParseError("Invalid date: " + date_string))
    }
    let result = output_format
    let tokens = ["YYYY", "YY", "MM", "M", "DD", "D", "HH", "H", "mm", "m", "ss", "s"]
    for (let token of tokens) {
      result = result.split(token).join(format_token(date, token))
    }
    return Result$Ok(result)
  } catch (error) {
    return Result$Error(new ParseError(error.toString()))
  }
}

export function from_timestamp(timestamp) {
  return new Date(timestamp).toISOString()
}
