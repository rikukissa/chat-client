import Bacon from 'baconjs';
import irc from 'io/irc/index';
import ui from 'io/ui';
import {getChannels} from 'channels';

import {messages$} from 'messages';
import {channels$} from 'channels';
import {currentChannels$} from 'current-channel';
import {notifications$} from 'channel-notifications';

const appState$ = Bacon.combineTemplate({
  channels: channels$,
  messages: messages$,
  currentChannels: currentChannels$,
  notifications: notifications$
});

// IO initialization
irc(appState$);
ui(appState$);

// Fetch initial data
getChannels();
