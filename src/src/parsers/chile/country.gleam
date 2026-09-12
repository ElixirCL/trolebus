import country
import currency
import parsers/chile/banco_chile/bank as banco_chile

pub fn country() -> country.Country {
  country.Country(
    id: "cl",
    name: "Chile",
    entities: [banco_chile.entity()],
    currencies: [currency.clp()],
    timezones: [
      "America/Santiago",
      "America/Punta_Arenas",
      "Pacific/Easter",
    ],
  )
}
