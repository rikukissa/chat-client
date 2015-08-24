import React from 'react';
import classNames from 'classnames';
import {sortBy, findWhere} from 'lodash';

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

              const notification = findWhere(this.props.notifications, {
                channelName: channel.name
              });

              const badgeClasses = classNames('channel__badge badge', {
                'badge--alert': notification && notification.alert,
                'badge--notice': notification && notification.notice
              });

              return (
                <li className={channelClasses} onClick={() => this.props.onSelect(channel)} key={i}>
                  <span className={badgeClasses}>
                    {notification && notification.unread > 0 ? notification.unread : '#'}
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
