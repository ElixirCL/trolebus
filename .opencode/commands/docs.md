---
description: Translate README.adoc to docs/README.md
---

Translate the README.adoc file to docs/README.md.

Additionally look for context inside user provided message: $ARGUMENTS

## Steps

1. Read the README.adoc file from the project root.
2. Convert AsciiDoc syntax to Markdown:
   - `= Heading` → `# Heading`
   - `== Heading` → `## Heading`
   - `=== Heading` → `### Heading`
   - `[source,sh]` code blocks → ` ```sh ` fenced blocks
   - `[cols="1,1"]` tables → Markdown tables
   - `|===` table delimiters → remove
   - `http://url[text]` → `[text](url)`
   - `*bold*` → `**bold**`
   - `_italic_` → `*italic*`
   - `+monospace+` → `` `monospace` ``
   - `. List items` → `- List items`
   - `----` literal blocks → ` ``` ` fenced blocks
   - `[mermaid]` blocks → ` ```mermaid ` fenced blocks
   - `++++` passthrough blocks → convert or remove as appropriate
3. Preserve all content and structure.
4. Write the result to `docs/README.md`.

## Output

- Print a summary of the conversion (lines converted, sections processed).
- Only modify `docs/README.md`.
