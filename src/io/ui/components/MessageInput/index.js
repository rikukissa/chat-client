import React from 'react';
import './index.styl'

export default class MessageInput extends React.Component {
  onSubmit(e) {
    e.preventDefault();

    const $el = React.findDOMNode(this.refs.input);
    this.props.onSubmit($el.value);
    $el.value = '';
  }
  render() {
    return (
      <form className='chat__input' onSubmit={(e) => this.onSubmit(e)}>
        <div className='chat__input-wrapper'>
          <input ref='input' placeholder='Write a message...' type='text' />
        </div>
      </form>
    );
  }
}
