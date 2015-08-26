import React from 'react';
import classNames from 'classnames';
import intersperse from 'intersperse';

import './index.styl';

function createLink({url, image}) {

  if(image) {
    return (
      <a className='message__image-wrapper' target='_blank' href={url}>
        <img src={url} />
      </a>
    );
  }

  return (
    <a target='_blank' href={url}>{url}</a>
  );
}

export default class Message extends React.Component {
  render() {
    const classes = classNames(this.props.className, 'message');

    const body = this.props.message.urls.reduce((memo, url) => {

      if(typeof memo === 'string') {
        return intersperse(memo.split(url.url), createLink(url));
      }

      return memo;

    }, this.props.message.body);

    return (
      <div className={classes}>
        <span className='message__body'>
          {body}
        </span>
      </div>
    );
  }
}
