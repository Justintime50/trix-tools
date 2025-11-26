/**
 * Render code blocks denoted by triple backticks as <pre><code> blocks.
 * @param {string} html
 * @returns {string}
 */
export function renderCodeBlocks(html) {
  return html.replace(/```(\w+)?\s*([\s\S]*?)```/g, (match, lang, code) => {
    // Strip HTML tags
    const stripped = code.replace(/<[^>]*>/g, '').replace(/\s+$/, ''); // <-- trim trailing whitespace
    // Escape HTML entities for safety
    const escaped = stripped.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const classAttr = lang ? ` class="language-${lang}"` : '';
    return `<pre><code${classAttr}>${escaped}</code></pre>`;
  });
}

/**
 * Render inline code blocks denoted by single backticks as <code> tags.
 * @param {string} html
 * @returns {string}
 */
export function renderInlineCode(html) {
  // Replace `code` with <code>code</code>, but not inside triple backticks
  return html.replace(/`([^`\n]+)`/g, (match, code) => {
    // Escape HTML entities for safety
    const escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<code>${escaped}</code>`;
  });
}
