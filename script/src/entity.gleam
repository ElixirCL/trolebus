pub type Entity {
  Entity(
    id: String,
    name: String,
    labels: List(String),
  )
}

pub fn banco_estado() -> Entity {
  Entity(
    id: "cl.bancoestado",
    name: "Banco Estado",
    labels: [],
  )
}

pub fn banco_chile() -> Entity {
  Entity(
    id: "cl.bancochile",
    name: "Banco Chile",
    labels: ["expense:cl.bancochile:payment-notifications"],
  )
}

pub fn entity_labels(entity: Entity) -> List(String) {
  entity.labels
}
