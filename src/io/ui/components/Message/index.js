import React from 'react';
import classNames from 'classnames';
import {
  nl2br,
  sanitize,
  embed,
  markdown,
  thumbnail,
  imgurEmbed
} from 'util/format';

import {compose} from 'lodash';

import './index.styl';

const format = compose(sanitize, nl2br, markdown, thumbnail, embed);
const formatAsync = (text) => imgurEmbed(text);

const Message = React.createClass({
  getInitialState() {
    return {
      asyncFormatted: null
    };
  },
  componentDidMount() {
    formatAsync(this.props.text)
    .then(asyncFormatted => this.setState({asyncFormatted}));
  },
  render() {
    const classes = classNames(this.props.className, 'message');

    return (
      <div className={classes}>
        <div
          className='message__body markdown-body'
          dangerouslySetInnerHTML={{
            __html: format(this.state.asyncFormatted || this.props.text)
          }}></div>
      </div>
    );
  }
});

export default Message;
