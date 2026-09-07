import gleam/http/request.{type Request}
import gleam/http/response.{type Response}

pub type UrlFetchBody

pub type UrlFetchError {
  NetworkError(String)
  UnableToReadBody
}

@external(javascript, "./fetch_ffi.mjs", "send")
pub fn send(
  request: Request(String),
) -> Result(Response(UrlFetchBody), UrlFetchError)

@external(javascript, "./fetch_ffi.mjs", "read_text_body")
pub fn read_text_body(
  response: Response(UrlFetchBody),
) -> Result(Response(String), UrlFetchError)
