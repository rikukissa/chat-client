import React from 'react';
import './index.styl';

import {sendMessage} from 'services/messages';
import {getChannels, selectChannel, partChannel} from 'services/channels';

import MessageInput from 'components/MessageInput';
import MessageBox from 'components/MessageBox';
import ChannelList from 'components/ChannelList';

const App = React.createClass({
  componentDidMount() {
    getChannels();
  },
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
