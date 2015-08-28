import marked from 'marked';
import highlight from 'highlight.js';
import urlRegex from 'url-regex';
import sanitizeHTML from 'sanitize-html';

marked.setOptions({
  highlight: code => highlight.highlightAuto(code).value,
  breaks: true,
  sanitize: false
});

export function markdown(text) {
  return marked(text);
}

function isImage(url) {
  return Boolean(url.split('?')[0].match(/\.(?:jpe?g|gif|png)$/));
}

export function sanitize(text) {
  return sanitizeHTML(text, {
    allowedTags: ['iframe', 'p', 'code', 'span', 'pre', 'a', 'br', 'img'],
    allowedAttributes: {
      iframe: ['*'],
      a: ['href'],
      img: ['src'],
      span: ['class']
    }
  });
}

export function thumbnail(text) {

  const matches = text.match(urlRegex());

  if(!matches) {
    return text;
  }

  return matches.reduce((memo, url) => {
    if(!isImage(url)) {
      return memo;
    }

    return memo.replace(url, `![${url}](${url})`);
  }, text);

}


export function embed(text) {
  return text
  .replace(// Spotify
    /http:\/\/open\.spotify\.com\/track\/(\S+)/g,
    '<iframe src="https://embed.spotify.com/?uri=spotify:track:$1" frameborder="0" allowtransparency="true"></iframe>')

  .replace(// Youtube
    /https?:\/\/(www\.)?youtube\.com\/watch\?v=(\S+)/g,
    '<iframe id="ytplayer" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/$2?autoplay=0" frameborder="0"></iframe>')

  .replace(// Imgur
    /http:\/\/imgur\.com\/gallery\/(\S+)/g,
    `<iframe class="imgur-album" width="100%" height="550" frameborder="0" src="https://imgur.com/a/$1/embed"></iframe>`);
}


export function nl2br(text) {
  return text.replace(/\n/g, (match, place) => {
    return place + 1 === text.length ? '' : '<br />';
  });
}
