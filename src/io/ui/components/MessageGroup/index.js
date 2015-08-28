import React from 'react';
import Message from 'io/ui/components/Message';
import moment from 'moment';

export default class MessageGroup extends React.Component {
  render() {

    return (
       <div className='message-group'>
          <div className='message-group__header'>

            { /* Nickname */
              !this.props.messages[0].nick ? null : (
                <span className='message-group__nick'>
                  {this.props.messages[0].nick}
                </span>
              )
            }

            { /* Timestamp */ }
            <span className='message-group__timestamp'>
              {moment(this.props.messages[0].received).format('HH:mm a')}
            </span>
          </div>
          <Message text={this.props.messages.map(m => m.body).join('\n')} />
        </div>
    );
  }
}
