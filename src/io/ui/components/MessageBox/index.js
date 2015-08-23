import React from 'react';
import timeago from 'timeago';

export default class MessageList extends React.Component {
  componentWillUpdate() {
    var node = React.findDOMNode(this.refs.messages);
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  }
  componentDidUpdate() {
    if(!this.shouldScrollBottom) {
      return;
    }
    var node = React.findDOMNode(this.refs.messages);
    node.scrollTop = node.scrollHeight;
  }
  render() {
    return (
      <div className='chat__messages' ref='messages'>
        <ul>
        {
          this.props.messages.map((message, i) => {
            const prev = this.props.messages[i - 1];
            const timeAgo = timeago(message.received);
            const timestamp = (
              <div className='message__received'>
                {timeago(message.received)}
              </div>
            )
            return (
              <li key={i} className='message'>
                {!prev || timeago(prev.received) !== timeAgo ? timestamp : null}
                <span className='message__nick'>{message.nick}</span>
                {message.body}
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}
