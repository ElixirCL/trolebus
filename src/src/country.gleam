import currency
import entity

pub type Country {
  Country(
    id: String,
    name: String,
    entities: List(entity.Entity),
    currencies: List(currency.Currency),
    timezones: List(String),
  )
}
