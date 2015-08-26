import React from 'react';
import classNames from 'classnames';
import './index.styl';
import {sortBy, findWhere} from 'lodash';

export default class ChannelList extends React.Component {
  render() {
    return (
      <div className='channels'>
        <ul>
        {
          sortBy(this.props.channels, 'name')
            .map((channel, i) => {
              const notification = findWhere(this.props.notifications, {
                channelName: channel.name
              });

              const channelClasses = classNames('channel', {
                'channel--is-active': this.props.currentChannel === channel,
                'channel--has-alert': notification && notification.alert
              });


              return (
                <li className={channelClasses} onClick={() => this.props.onSelect(channel)} key={i}>
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
