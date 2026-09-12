# AGENTS.md

## Project

Trolebus parses bank notification emails from Gmail and exports transaction data to Google Spreadsheets or an HTTP endpoint.

- Written in [Gleam](https://gleam.run), compiled to JavaScript.
- Bundled with Vite into a single `.gs` file for Google Apps Script.
- Source lives in `src/`.
- Entry point: `src/src/script.gleam`.
- Bundled output: `src/dist/script.gs`.
- See `README.adoc` for usage.

## Commands

Run from the repo root. Most tasks use the root `Taskfile.yml` (go-task). The `src` taskfile is included as `src:*` and runs inside `src/`.

| Goal | Command |
| --- | --- |
| Install dependencies | `task src:install` |
| Build bundled `.gs` | `task src:build` |
| Build + copy to `app/main.gs` | `task dist` |
| Convert README to HTML | `task docs` |
| Enter dev shell (devenv) | `task shell` |
| Test (from `src/`) | `gleam test` |
| Format check (from `src/`) | `gleam format --check src test` |
| Commit with `.commit-message` | `task c` |

## Development environment

- devenv (with direnv) provides Gleam, Erlang/OTP, Go Task, and pnpm.
- Gleam target is JavaScript (`target = "javascript"` in `src/gleam.toml`).
- Tests use Gleeunit; helpers live in `src/test`.
- Google Apps Script APIs are stubbed/bridged through `src/src/ffi/` (`*.mjs` files implement the Gleam `ffi` modules).

## Conventions

- Follow `.agents/rules/guidelines.md` (STE-100 prose, no verbosity, surgical edits).
- Commit messages: gitmoji + conventional commits, written to `.commit-message` for `task c`.
- Format Gleam code with `gleam format` before committing.
- Only `src/dist/script.gs` is compiled output; edit Gleam sources, not the bundle.
