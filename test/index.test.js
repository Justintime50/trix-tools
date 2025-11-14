/* eslint-env node, mocha */
import { assert } from 'chai';

import { renderTrixContentWithEmbeds } from '../index.js';

describe('Standard HTML', function () {
  it('returns standard HTML', function () {
    const html = renderTrixContentWithEmbeds('&lt;b&gt;Bold Text&lt;/b&gt;');
    assert.equal(html, '&lt;b&gt;Bold Text&lt;/b&gt;');
  });
});

describe('YouTube', function () {
  it('returns an embedded YouTube iframe when provided a youtube.com link', function () {
    const html = renderTrixContentWithEmbeds('https://www.youtube.com/watch?v=abc123');
    assert.equal(
      html,
      '<iframe width="560" height="315" src="https://youtube.com/embed/abc123" frameborder="0" allowfullscreen></iframe>'
    );
  });

  it('returns an embedded YouTube iframe when provided a youtu.be link', function () {
    const html = renderTrixContentWithEmbeds('https://www.youtu.be/abc123');
    assert.equal(
      html,
      '<iframe width="560" height="315" src="https://youtube.com/embed/abc123" frameborder="0" allowfullscreen></iframe>'
    );
  });

  it('returns an embedded YouTube iframe when provided a YouTube embeded iframe', function () {
    const html = renderTrixContentWithEmbeds(
      '&lt;iframe width="560" height="315" src="https://www.youtube.com/embed/abc123?si=xyz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen&gt;&lt;/iframe&gt;'
    );
    assert.equal(
      html,
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/abc123?si=xyz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
    );
  });
});

describe('Twitter', function () {
  it('returns an embedded Tweet blockquote when provided a Twitter link', function () {
    const html = renderTrixContentWithEmbeds('https://twitter.com/Justintime_50/status/123');
    assert.equal(
      html,
      '<blockquote class="twitter-tweet"><div class="trix-tools-tweet-loading">Loading tweet…</div><a href="https://twitter.com/Justintime_50/status/123"></a></blockquote>'
    );
  });

  it('returns an embedded Tweet blockquote when provided an X link', function () {
    const html = renderTrixContentWithEmbeds('https://x.com/Justintime_50/status/123');
    assert.equal(
      html,
      '<blockquote class="twitter-tweet"><div class="trix-tools-tweet-loading">Loading tweet…</div><a href="https://twitter.com/Justintime_50/status/123"></a></blockquote>'
    );
  });

  it('returns an embedded Tweet blockquote when provided a Twitter blockquote', function () {
    const html = renderTrixContentWithEmbeds(
      '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">test content <a href="https://t.co/abc">pic.twitter.com/abc</a></p>&mdash; Justintime50 (@Justintime_50) <a href="https://twitter.com/Justintime_50/status/123?ref_src=abc">December 7, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
    );
    assert.equal(
      html,
      '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">test content <a href="https://t.co/abc">pic.twitter.com/abc</a></p>&mdash; Justintime50 (@Justintime_50) <blockquote class="twitter-tweet"><div class="trix-tools-tweet-loading">Loading tweet…</div><a href="<blockquote class="twitter-tweet"><div class="trix-tools-tweet-loading">Loading tweet…</div><a href="https://twitter.com/Justintime_50/status/123?ref_src=abc">"></a></blockquote></a></blockquote></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
    );
  });
});
