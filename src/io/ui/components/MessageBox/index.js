import React from 'react';
import timeago from 'timeago';
import {sortBy} from 'lodash';
import MessageGroup from 'io/ui/components/MessageGroup';
import './index.styl';

function groupSequentialMessagesByUser(messages) {
  return messages.reduce((memo, message) => {

    const latestGroup = memo[memo.length - 1];

    const latestNick = latestGroup && latestGroup[latestGroup.length - 1].nick;

    if(memo.length === 0 || latestNick !== message.nick) {
      memo.push([message]);
    } else {
      latestGroup.push(message);
    }
    return memo;
  }, []);
}

const MessageBox = React.createClass({
  componentDidMount() {

  },
  componentWillUpdate() {
    const node = React.findDOMNode(this.refs.messages);
    this.shouldScrollBottom = (node.scrollTop + node.offsetHeight) > (node.scrollHeight - 50);
  },
  componentDidUpdate(prevProps) {
    const channelsChanged = prevProps.currentChannels !== this.props.currentChannels;

    if(this.shouldScrollBottom || channelsChanged) {
      setTimeout(this.scrollToBottom);
    }
  },
  imageLoaded() {
    if(this.shouldScrollBottom) {
      this.scrollToBottom();
    }
  },
  scrollToBottom() {
    const node = React.findDOMNode(this.refs.messages);
    node.scrollTop = node.scrollHeight;
  },
  render() {
    const sortedMessages = sortBy(this.props.messages, 'received');
    const messageGroups = groupSequentialMessagesByUser(sortedMessages).slice(-10);

    return (
      <div className='message-box' ref='messages'>
        {
          messageGroups.map((messageGroup, i) => {

            const prevGroup = messageGroups[i - 1];
            const lastMessage = prevGroup && prevGroup[0];
            const timeAgo = timeago(messageGroup[0].received);

            const equalTimestrings = lastMessage &&
              timeago(lastMessage.received) === timeAgo;

            /* X minutes ago - separator */
            const block = equalTimestrings ? [] : [(
              <div className='message-box__timestamp'>
                {timeAgo}
              </div>
            )];

            return block.concat(
              <MessageGroup
                key={messageGroup[0].id}
                imageLoaded={this.imageLoaded}
                messages={messageGroup} />);
          })
        }
      </div>
    );
  }
});

export default MessageBox;
