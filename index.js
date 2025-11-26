import { renderCodeBlocks, renderInlineCode } from './lib/code.js';
import { renderImageLinks } from './lib/images.js';
import { renderTwitterEmbeds } from './lib/twitter.js';
import { renderYouTubeEmbeds } from './lib/youtube.js';

const plugins = {
  codeBlocks: renderCodeBlocks,
  images: renderImageLinks,
  inlineCode: renderInlineCode,
  twitter: renderTwitterEmbeds,
  youtube: renderYouTubeEmbeds,
};

/**
 * Render Trix content with selected plugins.
 * @param {string} html - The HTML content to process.
 * @param {Object} options - Which plugins to enable (e.g. { youtube: true, twitter: true }).
 * @returns {string} - Processed HTML.
 */
export function renderTrixContent(
  html,
  options = { codeBlocks: true, images: true, inlineCode: true, youtube: true, twitter: true }
) {
  let result = html;
  for (const [key, enabled] of Object.entries(options)) {
    if (enabled && plugins[key]) {
      result = plugins[key](result);
    }
  }
  return result;
}

/**
 * Register a new plugin.
 * @param {string} name - Plugin name.
 * @param {function} fn - Plugin function.
 */
export function registerTrixPlugin(name, fn) {
  plugins[name] = fn;
}
