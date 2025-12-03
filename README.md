# Trix Tools

Tools for the Trix Text Editor.

[![Build Status](https://github.com/Justintime50/trix-tools/workflows/build/badge.svg)](https://github.com/Justintime50/trix-tools/actions)
[![Coverage Status](https://img.shields.io/codecov/c/github/justintime50/trix-tools)](https://app.codecov.io/github/Justintime50/trix-tools)
[![NPM](https://img.shields.io/npm/v/trix-tools)](https://www.npmjs.com/package/trix-tools)
[![Licence](https://img.shields.io/github/license/justintime50/trix-tools)](https://opensource.org/licenses/mit-license.php)

The [Trix Text Editor](https://github.com/basecamp/trix) is a WYSIWYG editor in the browser, allowing for easy text input in your projects. It has a few drawbacks though like not being able to render YouTube embeded videos, Twitter (X) Tweets, image links, or code blocks out of the box. Trix Tools comes with various tools to help render that input content when using Trix in your projects.

## Install

```sh
npm i trix-tools
```

## Usage

Trix Tools is modular, allowing you to choose which rendering plugins you want to use for your project. Below you'll find all the available plugins which can be disabled to fit your needs. All plugins are enabled out of the box.

```javascript
import { renderTrixContent } from 'trix-tools';

// Re-render all your original Trix HTML content using all plugins except Twitter
const trixContent = document.getElementById('trix-content');
trixContent.innerHTML = renderTrixContent(trixContent.innerHTML, { twitter: false });
```

### Plugins

#### Code Blocks

Plugin name: `codeBlocks`

You can paste:

\`\`\`python
foo = "hello world"
\`\`\`

into the Trix editor and Trix Tools will re-render it as:

`<pre><code class="language-python">foo = "hello world"\n</code></pre>`

We append the `language-{lang}` HTML class so you can use syntax highlighting packages. The language identifier at the start of your code block is optional.

#### Images

Plugin name: `images`

You can paste an image link into the Trix editor and Trix Tools will re-render it as an image HTML tag. The image will auto scale Y and max width 100% of its container.

#### Inline Code

Plugin name: `inlineCode`

You can paste \`mycode\` into the Trix editor and Trix Tools will re-render it as `<code>mycode</code>`.

#### Twitter

Plugin name: `twitter`

You can paste a simple link (eg: `https://twitter.com/Justintime_50/status/123`) into the Trix editor or a full Tweet blockquote and Trix Tools will re-render it as a well-formed embeded iframe (complete with Twitter script).

#### YouTube

Plugin name: `youtube`

You can paste a simple link (eg: `https://www.youtube.com/watch?v=abc123`) into the Trix editor or a full YouTube iframe and Trix Tools will re-render it as a well-formed embeded iframe.

#### Custom Plugins

Plugin name: whatever you want!

You can register your own plugins and have Trix Tools give the same treatment as our 1st party plugins to your content:

```js
import { renderTrixContent, registerTrixPlugin } from 'trix-tools';

// Define your custom plugin
function renderCustomStuff(html) {
  // Custom processing...
  return html.replace(/foo/g, 'bar');
}

// Register it
registerTrixPlugin('custom', renderCustomStuff);

// Use it
const trixContent = document.getElementById('trix-content');
trixContent.innerHTML = renderTrixContent(trixContent.innerHTML, { custom: true });
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
