/**
 * Render Twitter embeds as blockquotes with loading placeholders.
 * @param {string} html
 * @returns {string}
 */
export function renderTwitterEmbeds(html) {
  // Unescape Twitter blockquotes only
  html = html.replace(
    /&lt;blockquote class="twitter-tweet"([\s\S]*?)&gt;([\s\S]*?)&lt;\/blockquote&gt;/gi,
    (match, attrs, inner) =>
      `<blockquote class="twitter-tweet"${attrs}><div class="trix-tools-tweet-loading">Loading tweet…</div>${inner}</blockquote>`
  );
  // Remove any escaped script tags from Trix content
  html = html.replace(/&lt;script[\s\S]*?&lt;\/script&gt;/gi, '');

  // Replace Twitter/X status links (plain or inside <a>) with blockquote embed + loading
  // x.com urls are not supported, we convert them to twitter.com for embedding
  html = html.replace(
    /<a[^>]*href="(https?:\/\/(?:x\.com|twitter\.com)\/([a-zA-Z0-9_]+)\/status\/(\d+)[^\s"<]*)"[^>]*>.*?<\/a>/g,
    (match, url) => {
      const twitterUrl = url.replace('x.com', 'twitter.com');
      return `<blockquote class="twitter-tweet"><div class="trix-tools-tweet-loading">Loading tweet…</div><a href="${twitterUrl}"></a></blockquote>`;
    }
  );
  html = html.replace(/(https?:\/\/(?:x\.com|twitter\.com)\/([a-zA-Z0-9_]+)\/status\/(\d+)[^\s<]*)/g, (match, url) => {
    const twitterUrl = url.replace('x.com', 'twitter.com');
    return `<blockquote class="twitter-tweet"><div class="trix-tools-tweet-loading">Loading tweet…</div><a href="${twitterUrl}"></a></blockquote>`;
  });

  // Inject Twitter widgets.js script after rendering, if needed
  setTimeout(() => {
    if (
      document.body &&
      html.includes('class="twitter-tweet"') &&
      !document.querySelector('script[src*="platform.twitter.com/widgets.js"]')
    ) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://platform.twitter.com/widgets.js';
      document.body.appendChild(script);
    }
  }, 0);

  return html;
}
