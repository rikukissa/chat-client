import React from 'react';
import './index.styl';

import {sendMessage} from 'messages';
import {partChannel} from 'channels';
import {selectChannel, toggleChannel} from 'current-channel';

import classNames from 'classnames';

import MessageInput from 'io/ui/components/MessageInput';
import MessageBox from 'io/ui/components/MessageBox';
import ChannelList from 'io/ui/components/ChannelList';

const App = React.createClass({
  selectChannel(e, channel) {
    if(e.shiftKey) {
      return toggleChannel(channel);
    }
    selectChannel(channel);
  },
  render() {
    const channelNames = this.props.currentChannels.map(channel => channel.name);

    const messages = this.props.messages
      .filter(m => channelNames.indexOf(m.channel) > -1 || channelNames.length === 0 && !m.channel);

    const multipleChannelsSelected = channelNames.length > 1;

    const classes = classNames('chat', {
      'chat--multichannel': multipleChannelsSelected
    });

    return (
      <div className={classes}>
        <ChannelList
          onPart={partChannel}
          onSelect={this.selectChannel}
          channels={this.props.channels}
          notifications={this.props.notifications}
          currentChannels={channelNames} />
        <div className='chat__container'>
          <MessageBox
            currentChannels={channelNames}
            messages={messages} />
          {multipleChannelsSelected ? null : <MessageInput onSubmit={sendMessage} />}
        </div>
      </div>
    );
  }
});

export default App;
