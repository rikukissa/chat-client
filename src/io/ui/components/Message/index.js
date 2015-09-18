import React from 'react';
import classNames from 'classnames';
import {sanitize} from 'util/format';

import './index.styl';

const Message = React.createClass({
  getInitialState() {
    return {
      text: ''
    };
  },
  componentDidMount() {
    this.format(this.props.text);
  },
  componentWillReceiveProps(nextProps) {
    this.format(nextProps.text);
  },
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.text !== this.state.text;
  },
  format(text) {
    const sanitized = sanitize(text);
    this.setState({text: sanitized});

    this.props.formatter(sanitized)
      .then(formatted => this.setState({text: formatted}));
  },
  render() {
    const classes = classNames(this.props.className, 'message');

    return (
      <div className={classes}>
        <div
          className='message__body markdown-body'
          dangerouslySetInnerHTML={{
            __html: this.state.text
          }}></div>
      </div>
    );
  }
});

export default Message;
