import { renderTwitterEmbeds } from './lib/twitter.js';
import { renderYouTubeLinksAsEmbeds } from './lib/youtube.js';

export function renderTrixContentWithEmbeds(html, youtube = true, twitter = true) {
  if (youtube) {
    html = renderYouTubeLinksAsEmbeds(html);
  }
  if (twitter) {
    html = renderTwitterEmbeds(html);
  }

  return html;
}
