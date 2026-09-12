import config
import email
import gleam/io
import gleam/list
import parsers/chile/country as chile

pub fn main() -> Nil {
  io.println("Init")
  let countries = [chile.country()]
  let config = config.new(countries)
  let all_entities = list.flat_map(config.countries, fn(c) { c.entities })
  let emails = email.get_emails(config, all_entities)
  email.run_actions(emails, config)
  io.println("Done")
}
