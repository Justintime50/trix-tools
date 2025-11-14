export function renderYouTubeLinksAsEmbeds(html) {
  // Unescape any iframe tags that Trix stored as text
  html = html.replace(
    /&lt;iframe([\s\S]*?)&gt;([\s\S]*?)&lt;\/iframe&gt;/gi,
    (match, attrs, inner) => `<iframe${attrs}>${inner}</iframe>`
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
