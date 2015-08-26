import React from 'react';
import timeago from 'timeago';
import Message from 'io/ui/components/Message';
import moment from 'moment';

import './index.styl';

export default class MessageBox extends React.Component {
  componentWillUpdate() {
    const node = React.findDOMNode(this.refs.messages);
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  }
  componentDidUpdate() {
    if(!this.shouldScrollBottom) {
      return;
    }
    const node = React.findDOMNode(this.refs.messages);
    node.scrollTop = node.scrollHeight;
  }
  render() {

    const messageGroups = this.props.messages.reduce((memo, message) => {

      const latestGroup = memo[memo.length - 1];

      const latestNick = latestGroup && latestGroup[latestGroup.length - 1].nick;

      if(memo.length === 0 || latestNick !== message.nick) {
        memo.push([message]);
      } else {
        latestGroup.push(message);
      }
      return memo;
    }, []);

    return (
      <div className='message-box' ref='messages'>

        {


          messageGroups.map((messageGroup, i) => {


            const prevGroup = messageGroups[i - 1];
            const lastMessage = prevGroup && prevGroup[0];
            const timeAgo = timeago(messageGroup[0].received);

            const equalTimestrings = lastMessage &&
              timeago(lastMessage.received) === timeAgo;

            const block = equalTimestrings ? [] : [(
              <div className='message-box__timestamp'>
                {timeAgo}
              </div>
            )];


            const timestamp = moment(messageGroup[0].received).format('HH:mm a');

            return block.concat(
              <div className='message-group'>
                <div className='message-group__header'>
                  {
                    !messageGroup[0].nick ? null : (
                      <span className='message-group__nick'>
                        {messageGroup[0].nick}
                      </span>
                    )
                  }


                  <span className='message-group__timestamp'>
                    {timestamp}
                  </span>
                </div>

                {
                  messageGroup.map((message, i) =>
                    <Message key={i} message={message.body} />
                  )
                }
              </div>
            );
          })
        }

      </div>
    );
  }
}
