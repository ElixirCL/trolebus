pub type Entity {
  Entity(
    id: String,
    name: String,
  )
}

pub fn banco_estado() -> Entity {
  Entity(id: "cl.bancoestado", name: "Banco Estado")
}
