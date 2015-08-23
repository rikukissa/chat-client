import React from 'react';
import classNames from 'classnames';
import {sortBy} from 'lodash';

export default class ChannelList extends React.Component {
  render() {
    return (
      <div className='chat__channels'>
        <ul>
        {
          sortBy(this.props.channels, 'name')
            .map((channel, i) => {

              const channelClasses = classNames('channel', {
                'channel--is-active': this.props.currentChannel === channel
              });

              const badgeClasses = classNames('channel__badge badge', {
                'badge--alert': channel.notifications.message,
                'badge--notice': channel.notifications.join
              });

              return (
                <li className={channelClasses} onClick={() => this.props.onSelect(channel)} key={i}>
                  <span className={badgeClasses}>
                    {channel.unread > 0 ? channel.unread : '#'}
                  </span>
                  <span className='channel__name'>{channel.name.replace('#', '')}</span>
                  <button onClick={() => this.props.onPart(channel)}>
                    X
                  </button>
                </li>
              );
            })
        }
        </ul>
      </div>

    );
  }
}
