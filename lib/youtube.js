/**
 * Render YouTube links and iframes as embedded videos.
 * @param {string} html
 * @returns {string}
 */
export function renderYouTubeEmbeds(html) {
  // Unescape any iframe tags that Trix stored as text
  html = html.replace(
    /&lt;iframe([\s\S]*?)&gt;([\s\S]*?)&lt;\/iframe&gt;/gi,
    (match, attrs, inner) => `<iframe${attrs}>${inner}</iframe>`
  );

  // Remove <a> tags around YouTube links (auto-linked by Trix)
  html = html.replace(
    /<a[^>]*href="(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]+[^\s"<]*)"[^>]*>(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]+[^\s"<]*)<\/a>/g,
    (match, url) => url
  );
  html = html.replace(
    /<a[^>]*href="(https?:\/\/(?:www\.)?youtu\.be\/[a-zA-Z0-9_-]+[^\s"<]*)"[^>]*>(https?:\/\/(?:www\.)?youtu\.be\/[a-zA-Z0-9_-]+[^\s"<]*)<\/a>/g,
    (match, url) => url
  );

  // Replace normal YouTube watch links
  html = html.replace(
    /(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)([^\s<]*)?)/g,
    (match, url, videoId, query = '') =>
      `<iframe width="560" height="315" src="https://youtube.com/embed/${videoId}${
        query || ''
      }" frameborder="0" allowfullscreen></iframe>`
  );

  // Replace youtu.be links
  html = html.replace(
    /(https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)([^\s<]*)?)/g,
    (match, url, videoId, query = '') =>
      `<iframe width="560" height="315" src="https://youtube.com/embed/${videoId}${
        query || ''
      }" frameborder="0" allowfullscreen></iframe>`
  );

  return html;
}
