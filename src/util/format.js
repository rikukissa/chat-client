import marked from 'marked';
import highlight from 'highlight.js';
import {decode} from 'he';
import urlRegex from 'url-regex';
import sanitizeHTML from 'sanitize-html';
import {last} from 'lodash';
import composeAsync from 'compose-async';
import * as imgur from 'services/imgur';

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
  return sanitizeHTML(text);
}

// Decodes encoded HTML entities inside <pre> tags
export function decodeHE(html) {
  return html.replace(
    /<code>([\s\S]*)<\/code>/gm,
    (_, match) => `<code>${decode(match)}</code>`
  );
}

function createImageMarkdown(text, urls) {

  return urls.reduce((memo, url) => {

    if(!isImage(url)) {
      return {
        ...memo,
        position: memo.text.indexOf(url) + url.length
      };
    }

    const replacer = `![${url}](${url})`;

    const previousText = memo.text.slice(0, memo.position);
    const remainingText = memo.text.slice(memo.position);

    return {
      text: previousText + remainingText.replace(url, replacer),
      position: previousText.length + remainingText.indexOf(url) + replacer.length
    };

  }, {
    text,
    position: 0
  }).text;
}

export function thumbnail(text) {

  const matches = text.match(urlRegex());

  if(!matches) {
    return text;
  }

  return createImageMarkdown(text, matches);
}

export function nl2br(text) {
  return text.replace(/\n/g, (match, place) => {
    return place + 1 === text.length ? '' : '<br />';
  });
}

function defaultEmbeds(text) {
  return text
  .replace(// Spotify
    /http:\/\/open\.spotify\.com\/track\/(\S+)/g,
    '<iframe src="https://embed.spotify.com/?uri=spotify:track:$1" frameborder="0" allowtransparency="true"></iframe>')

  .replace(// Youtube
    /https?:\/\/(www\.)?youtube\.com\/watch\?v=(\S+)/g,
    '<iframe id="ytplayer" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/$2?autoplay=0" frameborder="0"></iframe>')
}

function imgurEmbeds(text) {
  const regex = /https?:\/\/imgur\.com\/gallery\/\S+/g;

  const matches = text.match(regex);

  if(!matches) {
    return Promise.resolve(text);
  }

  return matches.reduce((promise, url) => {
    const id = last(url.split('/').filter(str => str !== ''));

    return promise.then((formatted) => {
      return imgur.getEmbed(id).then(html =>
        formatted.split(url).join(html)
      ).catch(() => formatted);
    });

  }, Promise.resolve(text));
}

export const embed = composeAsync(defaultEmbeds, imgurEmbeds);
