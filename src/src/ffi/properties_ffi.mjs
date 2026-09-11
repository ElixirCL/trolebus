import { Ok, Error } from "../gleam.mjs"

export function get_script_property(key) {
  const value = PropertiesService.getScriptProperties().getProperty(key)
  if (value === null || value === undefined) {
    return new Error(undefined)
  }
  return new Ok(value)
}

export function set_script_property(key, value) {
  PropertiesService.getScriptProperties().setProperty(key, value)
}

export function get_all_script_properties() {
  const props = PropertiesService.getScriptProperties().getProperties()
  const entries = Object.entries(props).map(([k, v]) => [k, v])
  return new Ok(entries)
}
