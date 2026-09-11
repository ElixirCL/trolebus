import {
  Result$Ok,
  Result$Error,
  toList,
} from "../gleam.mjs"
import {
  Response$Response,
  map as map_response,
} from "../../gleam_http/gleam/http/response.mjs"
import {
  NetworkError,
  UnableToReadBody,
} from "./fetch.mjs"
import { to_string as uri_to_string } from "../../gleam_stdlib/gleam/uri.mjs"
import { method_to_string } from "../../gleam_http/gleam/http.mjs"
import { to_uri } from "../../gleam_http/gleam/http/request.mjs"

function request_common(request) {
  let url = uri_to_string(to_uri(request))
  let method = method_to_string(request.method).toLowerCase()
  let headers = {}
  for (let [k, v] of request.headers) headers[k] = v
  let options = { method, headers, muteHttpExceptions: true }
  return [url, options]
}

export function send(request) {
  try {
    let [url, options] = request_common(request)
    let method = options.method
    if (method !== "get" && method !== "head") {
      options.payload = request.body
    }
    let response = UrlFetchApp.fetch(url, options)
    let headers = Object.entries(response.getAllHeaders()).reverse()
    return Result$Ok(Response$Response(response.getResponseCode(), toList(headers), response))
  } catch (error) {
    return Result$Error(NetworkError(error.toString()))
  }
}

export function read_text_body(response) {
  try {
    let body = response.body.getContentText()
    return Result$Ok(map_response(response, () => body))
  } catch (error) {
    return Result$Error(UnableToReadBody())
  }
}
