import 'inputs/chat';

import React from 'react';
import Bacon from 'baconjs';
import App from 'components/App';

import {toProperty as messagesProperty} from 'services/messages';
import {toProperty as channelsProperty, currentChannel$} from 'services/channels';

const channels$ = channelsProperty([]);

const appState = Bacon.combineTemplate({
  channels: channels$,
  messages: messagesProperty([], channels$, currentChannel$),
  currentChannel: currentChannel$
});

appState.onValue((state) => {
  React.render(<App {...state} />, document.body);
});
