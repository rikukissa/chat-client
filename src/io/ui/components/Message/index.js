import React from 'react';
import classNames from 'classnames';
import {nl2br, sanitize, embed, markdown, thumbnail} from 'util/format';
import {compose} from 'lodash';
import './index.styl';

const format = compose(sanitize, nl2br, markdown, thumbnail, embed);

const Message = React.createClass({
  render() {
    const classes = classNames(this.props.className, 'message');

    return (
      <div className={classes}>
        <div
          className='message__body markdown-body'
          dangerouslySetInnerHTML={{
            __html: format(this.props.text)
          }}></div>
      </div>
    );
  }
});

export default Message;
