import React from 'react';
import './index.styl';

import {sendMessage} from 'messages';
import {getChannels, selectChannel, partChannel} from 'channels';

import MessageInput from 'io/ui/components/MessageInput';
import MessageBox from 'io/ui/components/MessageBox';
import ChannelList from 'io/ui/components/ChannelList';

const App = React.createClass({
  render() {
    const messages = !this.props.currentChannel ? [] :
      this.props.messages.filter(m => m.channel === this.props.currentChannel.name);

    return (
      <div className='chat'>
        <ChannelList
          onPart={partChannel}
          onSelect={selectChannel}
          channels={this.props.channels}
          currentChannel={this.props.currentChannel} />
        <div className='chat__container'>
          <MessageBox messages={messages} />
          <MessageInput onSubmit={sendMessage} />
        </div>
      </div>
    );
  }
});

export default App;
