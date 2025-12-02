/* eslint-env node, mocha */
import { assert } from 'chai';

import { registerTrixPlugin, renderTrixContent } from '../index.js';

describe('standard html', function () {
  it('returns standard html', function () {
    const html = renderTrixContent('&lt;b&gt;Bold Text&lt;/b&gt;');
    assert.equal(html, '&lt;b&gt;Bold Text&lt;/b&gt;');
  });
});

describe('codeBlocks plugin', function () {
  it('returns an html code block with language when triple backticks are provided', function () {
    const html = renderTrixContent('```python\nfoo = "hello world"\n```');
    assert.equal(html, '<pre><code class="language-python">foo = "hello world"</code></pre>');
  });

  it('returns an html code block without language when triple backticks are provided', function () {
    const html = renderTrixContent('```\nfoo = "hello world"\n```');
    assert.equal(html, '<pre><code>foo = "hello world"</code></pre>');
  });
});

describe('inlineCode plugin', function () {
  it('returns an html code wrapper when single backticks are provided', function () {
    const html = renderTrixContent('`myCode`');
    assert.equal(html, '<code>myCode</code>');
  });
});

describe('images plugin', function () {
  it('returns an html image tag when an image link is provided', function () {
    const html = renderTrixContent('https://example.com/image.png');
    assert.equal(html, '<img src="https://example.com/image.png" style="max-width:100%;height:auto;">');
  });
});

describe('twitter plugin', function () {
  it('returns an embedded tweet blockquote when provided a twitter link', function () {
    const html = renderTrixContent('https://twitter.com/Justintime_50/status/123');
    assert.equal(
      html,
      '<blockquote class="twitter-tweet"><div class="trix-tools-tweet-loading">Loading tweet…</div><a href="https://twitter.com/Justintime_50/status/123"></a></blockquote>'
    );
  });

  it('returns an embedded tweet blockquote when provided an x link', function () {
    const html = renderTrixContent('https://x.com/Justintime_50/status/123');
    assert.equal(
      html,
      '<blockquote class="twitter-tweet"><div class="trix-tools-tweet-loading">Loading tweet…</div><a href="https://twitter.com/Justintime_50/status/123"></a></blockquote>'
    );
  });

  it('returns an embedded tweet blockquote when provided a twitter blockquote', function () {
    const html = renderTrixContent(
      '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">test content <a href="https://t.co/abc">pic.twitter.com/abc</a></p>&mdash; Justintime50 (@Justintime_50) <a href="https://twitter.com/Justintime_50/status/123?ref_src=abc">December 7, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
    );
    assert.equal(
      html,
      '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">test content <a href="https://t.co/abc">pic.twitter.com/abc</a></p>&mdash; Justintime50 (@Justintime_50) <blockquote class="twitter-tweet"><div class="trix-tools-tweet-loading">Loading tweet…</div><a href="<blockquote class="twitter-tweet"><div class="trix-tools-tweet-loading">Loading tweet…</div><a href="https://twitter.com/Justintime_50/status/123?ref_src=abc">"></a></blockquote></a></blockquote></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
    );
  });
});

describe('youtube plugin', function () {
  it('returns an embedded youtube iframe when provided a youtube shorts link', function () {
    const html = renderTrixContent('https://youtube.com/shorts/abc?si=xyz');
    assert.equal(
      html,
      '<iframe width="560" height="315" src="https://youtube.com/embed/abc?si=xyz" frameborder="0" allowfullscreen></iframe>'
    );
  });

  it('returns an embedded youtube iframe when provided a youtube.com link', function () {
    const html = renderTrixContent('https://www.youtube.com/watch?v=abc123');
    assert.equal(
      html,
      '<iframe width="560" height="315" src="https://youtube.com/embed/abc123" frameborder="0" allowfullscreen></iframe>'
    );
  });

  it('returns an embedded youtube iframe when provided a youtube.com link even if wrapped by trix with an <a> tag', function () {
    const html = renderTrixContent(
      '<a href="https://www.youtube.com/watch?v=abc123">https://www.youtube.com/watch?v=abc123</a>'
    );
    assert.equal(
      html,
      '<iframe width="560" height="315" src="https://youtube.com/embed/abc123" frameborder="0" allowfullscreen></iframe>'
    );
  });

  it('returns an embedded youtube iframe when provided a youtu.be link', function () {
    const html = renderTrixContent('https://www.youtu.be/abc123');
    assert.equal(
      html,
      '<iframe width="560" height="315" src="https://youtube.com/embed/abc123" frameborder="0" allowfullscreen></iframe>'
    );
  });

  it('returns an embedded youtube iframe when provided a youtube embeded iframe', function () {
    const html = renderTrixContent(
      '&lt;iframe width="560" height="315" src="https://www.youtube.com/embed/abc123?si=xyz" title="youtube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen&gt;&lt;/iframe&gt;'
    );
    assert.equal(
      html,
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/abc123?si=xyz" title="youtube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
    );
  });
});

describe('custom plugin', function () {
  it('registers and uses a custom plugin when provied', function () {
    registerTrixPlugin('custom', (html) => {
      return html.replace(/foo/g, 'bar');
    });
    const html = renderTrixContent('foo', { custom: true });
    assert.equal(html, 'bar');
  });
});
