/**
 * Replace plain image links with <img> tags.
 * @param {string} html
 * @returns {string}
 */
export function renderImageLinks(html) {
  return html.replace(
    /(https?:\/\/[^\s"'<>]+?\.(jpg|jpeg|png|gif|webp|svg))/gi,
    (match) => `<img src="${match}" style="max-width:100%;height:auto;">`
  );
}
