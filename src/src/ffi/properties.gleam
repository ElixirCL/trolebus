pub type Properties

@external(javascript, "./properties_ffi.mjs", "get_script_property")
pub fn get_script_property(key: String) -> Result(String, Nil)

@external(javascript, "./properties_ffi.mjs", "set_script_property")
pub fn set_script_property(key: String, value: String) -> Nil

@external(javascript, "./properties_ffi.mjs", "get_all_script_properties")
pub fn get_all_script_properties() -> Result(List(#(String, String)), Nil)
