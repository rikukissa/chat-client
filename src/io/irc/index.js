import {
  // Incoming channels
  getChannels$,
  part$,
  // Outgoing channels
  createChannel,
  removeChannel
} from 'channels';

import {addMessage, sendMessage$} from 'messages';
import {times} from 'lodash';
import Chance from 'chance';
const chance = new Chance();

export const CHANNELS = times(15, ::chance.hashtag);

export default function init() {

  /*
   * Events from application
   */

  sendMessage$.onValue((message) => {
    setTimeout(() => {
      addMessage(message);
    }, 500);
  });

  getChannels$.onValue(() => {
    setTimeout(() => {
      CHANNELS.map(createChannel);
    }, 500);
  });

  part$.onValue((channelName) => {
    setTimeout(() => {
      removeChannel(channelName);
    }, 500);
  });

  /*
   * Events from data source
   */

  (function sendRandomMessage() {
    addMessage({
      channel: CHANNELS[Math.floor(CHANNELS.length * Math.random())],
      nick: chance.first(),
      body: chance.sentence()
    });
    setTimeout(sendRandomMessage, Math.random() * 4000);
  })();
}

