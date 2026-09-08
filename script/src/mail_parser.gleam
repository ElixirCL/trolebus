import gleam/dict
import gleam/string
import html_parser.{type Element, type Attribute, Attribute, Content, EndElement, StartElement}

pub type HtmlTable {
  HtmlTable(
    sections: dict.Dict(String, dict.Dict(String, String)),
    flat: dict.Dict(String, String),
  )
}

pub fn parse_html_tables(html: String) -> HtmlTable {
  let elements = html_parser.as_list(html)
  let flat = dict.new()
  let sections = dict.new()
  let result = walk_elements(elements, flat, sections, "")
  HtmlTable(sections: result.1, flat: result.0)
}

fn walk_elements(
  elements: List(Element),
  flat: dict.Dict(String, String),
  sections: dict.Dict(String, dict.Dict(String, String)),
  current_section: String,
) -> #(dict.Dict(String, String), dict.Dict(String, dict.Dict(String, String))) {
  case elements {
    [] -> #(flat, sections)
    [element, ..rest] -> {
      case element {
        StartElement("tr", _, _) -> {
          let #(row_data, remaining) = extract_row(rest, dict.new(), "")
          let flat_updated = dict.merge(flat, row_data)
          let sections_updated = case current_section {
            "" -> sections
            section -> {
              let existing = case dict.get(sections, section) {
                Ok(s) -> s
                Error(_) -> dict.new()
              }
              let updated = dict.merge(existing, row_data)
              dict.insert(sections, section, updated)
            }
          }
          walk_elements(remaining, flat_updated, sections_updated, current_section)
        }
        StartElement("th", attrs, _) -> {
          let colspan = get_attribute(attrs, "colspan")
          let text = extract_next_content(rest)
          case colspan {
            "2" -> {
              let new_section = text
              let sections_with_new = case dict.get(sections, new_section) {
                Error(_) -> dict.insert(sections, new_section, dict.new())
                Ok(_) -> sections
              }
              walk_elements(rest, flat, sections_with_new, new_section)
            }
            _ -> walk_elements(rest, flat, sections, current_section)
          }
        }
        _ -> walk_elements(rest, flat, sections, current_section)
      }
    }
  }
}

fn extract_row(
  elements: List(Element),
  row_data: dict.Dict(String, String),
  last_label: String,
) -> #(dict.Dict(String, String), List(Element)) {
  case elements {
    [] -> #(row_data, [])
    [element, ..rest] -> {
      case element {
        Content(text) -> {
          let trimmed = string.trim(text)
          case trimmed {
            "" -> extract_row(rest, row_data, last_label)
            _ -> {
              case last_label {
                "" -> extract_row(rest, row_data, trimmed)
                _ -> {
                  let updated = dict.insert(row_data, last_label, trimmed)
                  extract_row(rest, updated, "")
                }
              }
            }
          }
        }
        StartElement("td", _, _) -> extract_row(rest, row_data, last_label)
        StartElement("th", _, _) -> #(row_data, elements)
        EndElement("tr") -> #(row_data, rest)
        _ -> extract_row(rest, row_data, last_label)
      }
    }
  }
}

fn extract_next_content(elements: List(Element)) -> String {
  case elements {
    [] -> ""
    [Content(text), ..] -> string.trim(text)
    [_, ..rest] -> extract_next_content(rest)
  }
}

fn get_attribute(attrs: List(Attribute), key: String) -> String {
  case attrs {
    [] -> ""
    [Attribute(k, v), ..rest] ->
      case k == key {
        True -> v
        False -> get_attribute(rest, key)
      }
  }
}

pub fn get_value(rows: HtmlTable, label: String) -> String {
  case dict.get(rows.flat, label) {
    Ok(value) -> value
    Error(_) -> ""
  }
}

pub fn get_section_value(
  rows: HtmlTable,
  section: String,
  label: String,
) -> String {
  case dict.get(rows.sections, section) {
    Ok(section_rows) ->
      case dict.get(section_rows, label) {
        Ok(value) -> value
        Error(_) -> ""
      }
    Error(_) -> ""
  }
}

pub fn get_all_values(rows: HtmlTable) -> dict.Dict(String, String) {
  rows.flat
}
