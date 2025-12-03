import { renderCodeBlocks, renderInlineCode } from './lib/code.js';
import { renderImageLinks } from './lib/images.js';
import { renderTwitterEmbeds } from './lib/twitter.js';
import { renderYouTubeEmbeds } from './lib/youtube.js';

const pluginsMapping = {
  codeBlocks: renderCodeBlocks,
  images: renderImageLinks,
  inlineCode: renderInlineCode,
  twitter: renderTwitterEmbeds,
  youtube: renderYouTubeEmbeds,
};

/**
 * Render Trix content with selected plugins.
 * @param {string} html - The HTML content to process.
 * @param {Object} plugins - Which plugins to enable/disable.
 * @returns {string} - Processed HTML.
 */
export function renderTrixContent(html, plugins = {}) {
  const pluginsDefault = { codeBlocks: true, images: true, inlineCode: true, youtube: true, twitter: true };
  const finalPlugins = { ...pluginsDefault, ...plugins };
  let result = html;
  for (const [key, enabled] of Object.entries(finalPlugins)) {
    if (enabled && pluginsMapping[key]) {
      result = pluginsMapping[key](result);
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
  pluginsMapping[name] = fn;
}
