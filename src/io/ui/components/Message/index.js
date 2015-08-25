import React from 'react';
import classNames from 'classnames';
import './index.styl';

export default class Message extends React.Component {
  render() {
    const classes = classNames(this.props.className, 'message');

    return (
      <div className={classes}>
        <span className='message__body'>
          {this.props.message}
        </span>
      </div>
    );
  }
}
