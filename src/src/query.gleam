import entity.{type Entity}
import gleam/dict
import gleam/list
import gleam/string
import labels

pub type QueryElement {
  QueryElement(name: Int, entity: Entity, label: labels.Label)
}

pub type QueryBuilder {
  QueryBuilder(
    elements: dict.Dict(String, QueryElement),
    labels: List(String),
    queries: List(String),
    query: String,
  )
}

pub fn new(entities: List(Entity)) -> QueryBuilder {
  let initial =
    QueryBuilder(elements: dict.new(), labels: [], queries: [], query: "")
  let builder =
    list.fold(entities, initial, fn(acc, ent) {
      let ent_labels = entity.entity_labels(ent)
      list.fold(ent_labels, acc, fn(acc2, lbl) {
        let label = labels.for_query(lbl)
        let element = QueryElement(name: 0, entity: ent, label: label)
        let elements =
          acc2.elements
          |> dict.insert(label.key, element)
          |> dict.insert(label.raw, element)
          |> dict.insert(label.formatted, element)
          |> dict.insert(label.query, element)
        let labels_list = list.append(acc2.labels, [label.query])
        QueryBuilder(..acc2, elements: elements, labels: labels_list)
      })
    })
  build(builder)
}

fn build(builder: QueryBuilder) -> QueryBuilder {
  let combined_query = case builder.labels {
    [] -> "in:unread ()"
    _ -> {
      let label_parts =
        builder.labels
        |> list.map(fn(l) { "label:" <> l })
        |> string.join(" | ")
      "in:unread (" <> label_parts <> ")"
    }
  }
  let individual_queries =
    builder.labels
    |> list.map(fn(l) { "in:unread (label:" <> l <> ")" })
  QueryBuilder(..builder, query: combined_query, queries: individual_queries)
}

pub fn element_for_label(
  builder: QueryBuilder,
  label: String,
) -> Result(QueryElement, Nil) {
  let key = string.lowercase(label)
  dict.get(builder.elements, key)
}

pub fn element_for_labels(
  builder: QueryBuilder,
  label_names: List(String),
) -> Result(QueryElement, Nil) {
  case label_names {
    [] -> Error(Nil)
    [label, ..rest] -> {
      case element_for_label(builder, label) {
        Ok(element) -> Ok(element)
        Error(_) -> element_for_labels(builder, rest)
      }
    }
  }
}
