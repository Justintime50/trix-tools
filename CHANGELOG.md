# CHANGELOG

## v0.3.2 (2025-12-03)

- Fixes newline/linebreak rendering in code blocks
- Fixes single backtick escaping in code blocks

## v0.3.1 (2025-12-02)

- Fixes default plugins list to merge with user-provided plugins list
- 2nd param of `renderTrixContent` renamed from `options` to `plugins`

## v0.3.0 (2025-12-02)

- YouTube Shorts links can now be embedded

## v0.2.1 (2025-11-26)

- It's possible that when pasting a YouTube link into Trix, it auto-links it for you which messes with our re-render to a YouTube embed. We strip Trix's linking for YouTube links so we can instead embed it directly

## v0.2.0 (2025-11-26)

- `renderTrixContentWithEmbeds` is now `renderTrixContent`
- Adds the following plugins which can be disabled through the `options` param of `renderTrixContent`:
  - `codeBlock`
  - `images`
  - `inlineCode`
- Adds `registerTrixPlugin` function allowing registration of 3rd party plugins

## v0.1.0 (2025-11-14)

- Adds YouTube embed rendering
- Adds Twitter (X) embed rendering
