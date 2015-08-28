import React from 'react';
import Textarea from 'react-textarea-autosize';

import './index.styl';

const ENTER_KEY = 13;

export default React.createClass({
  onKeyDown(e) {
    if(e.keyCode === ENTER_KEY && !e.shiftKey) {
      this.onSubmit(e);
    }
  },
  onSubmit(e) {
    e.preventDefault();

    const $el = React.findDOMNode(this.refs.input);
    this.props.onSubmit($el.value);
    $el.value = '';
  },
  render() {
    return (
      <form className='chat__input' onSubmit={(e) => this.onSubmit(e)}>
        <Textarea onKeyDown={this.onKeyDown} ref='input' placeholder='Write a message...' />
      </form>
    );
  }
});
