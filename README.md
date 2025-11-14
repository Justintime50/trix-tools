# Trix Tools

Tools for the Trix Text Editor.

[![Build Status](https://github.com/Justintime50/trix-tools/workflows/build/badge.svg)](https://github.com/Justintime50/trix-tools/actions)
[![Coverage Status](https://img.shields.io/codecov/c/github/justintime50/trix-tools)](https://app.codecov.io/github/Justintime50/trix-tools)
[![NPM](https://img.shields.io/npm/v/trix-tools)](https://www.npmjs.com/package/trix-tools)
[![Licence](https://img.shields.io/github/license/justintime50/trix-tools)](https://opensource.org/licenses/mit-license.php)

The [Trix Text Editor](https://github.com/basecamp/trix) is a WYSIWYG editor in the browser, allowing for easy text input in your projects. It has a few drawbacks though like not being able to render YouTube embeded videos or Twitter (X) Tweets out of the box. Trix Tools comes with various tools to help when using Trix in your projects.

## Install

```sh
npm i trix-tools
```

## Usage

### Render Trix Content with Embeds

#### YouTube

You can paste a simple link (eg: `https://www.youtube.com/watch?v=abc123`) into the Trix editor or a full YouTube iframe and Trix Tools will re-render it for you to be a well-formed embeded iframe.

#### Twitteer

You can paste a simple link (eg: `https://twitter.com/Justintime_50/status/123`) into the Trix editor or a full Tweet blockquote and Trix Tools will re-render it for you to be a well-formed embeded iframe (complete with Twitter script).

```javascript
import { renderTrixContentWithEmbeds } from 'trix-tools';

// Re-render all your original Trix HTML content but with YouTube and Twitter links embeded
const trixContent = document.getElementById("trix-content");
trixContent.innerHTML = renderTrixContentWithEmbeds(trixContent.innerHTML, { youtube: true, twitter: true });
```

## Development

```bash
# Lint the project
npm run lint

# Run tests
npm run test

# Run test coverage
npm run coverage
```
