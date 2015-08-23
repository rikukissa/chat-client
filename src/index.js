import Bacon from 'baconjs';
import irc from 'io/irc/index';
import ui from 'io/ui';
import {getChannels} from 'channels';

import {toProperty as messagesProperty} from 'messages';
import {toProperty as channelsProperty, currentChannel$} from 'channels';

const channels$ = channelsProperty([]);

const appState$ = Bacon.combineTemplate({
  channels: channels$,
  messages: messagesProperty([], channels$, currentChannel$),
  currentChannel: currentChannel$
});

// IO initialization
irc(appState$);
ui(appState$);

// Fetch initial datae
getChannels();
