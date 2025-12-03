/**
 * Render code blocks denoted by triple backticks as <pre><code> blocks.
 * @param {string} html
 * @returns {string}
 */
export function renderCodeBlocks(html) {
  return html.replace(/```(\w+)?\s*([\s\S]*?)```/g, (match, lang, code) => {
    // Convert <br /> tags to newlines first (if present from Trix) - <pre> preserves newlines
    let normalized = code.replace(/<br\s*\/?>/gi, '\n');
    // Remove the very first newline if present so we don't have awkward top padding in code blocks
    if (normalized.startsWith('\n')) {
      normalized = normalized.slice(1);
    }
    // Escape single backticks
    const escaped = normalized.replace(/`/g, '&#96;');
    // Assign language class if specified so syntax highlighting can be applied
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
    return `<code>${code}</code>`;
  });
}
