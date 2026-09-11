import entity
import currency

pub type Country {
  Country(
    id: String,
    name: String,
    entities: List(entity.Entity),
    currencies: List(currency.Currency),
    timezones: List(String),
  )
}

pub fn chile() -> Country {
  Country(
    id: "cl",
    name: "Chile",
    entities: [entity.banco_estado(), entity.banco_chile()],
    currencies: [currency.clp()],
    timezones: [
      "America/Santiago",
      "America/Punta_Arenas",
      "Pacific/Easter",
    ],
  )
}
