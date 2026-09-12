import country.{type Country}

pub const max_threads = 1

pub type Config {
  Config(countries: List(Country))
}

pub fn new(countries: List(Country)) -> Config {
  Config(countries: countries)
}
