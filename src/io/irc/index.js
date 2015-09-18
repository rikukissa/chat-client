import irc from 'irc';
import Bacon from 'baconjs';

import {
  // Incoming channels
  part$,
  join$,
  // Outgoing channels
  createChannel,
  removeChannel
} from 'channels';

import config from 'config';

import {addMessage, sendMessage$} from 'messages';
import {times} from 'lodash';
import Chance from 'chance';

const chance = new Chance();

export const CHANNELS = times(15, ::chance.hashtag);

export default function init() {

  const client = new irc.Client(config.irc.server, config.irc.nick, {
    port: config.irc.port,
    username: config.irc.username,
    password: config.irc.password
  });

  client.on('registered', ::console.log);

  const join$ = Bacon.fromEvent(client, 'join', (channel, nick) =>
    ({nick, channel})
  );

  join$
    .filter((event) => event.nick === client.nick)
    .map('.channel')
    .onValue(createChannel);


  Bacon.fromEvent(client, 'motd', (body) => {
    return {body, motd: true};
  }).onValue(addMessage);

  Bacon.fromEvent(client, 'message', (nick, channel, body, event) => {
    return {nick, channel, body, prefix: event.prefix};
  })
  .filter(({prefix}) => prefix !== '***!znc@znc.in')
  .onValue(addMessage);

  /*
   * Events from application
   */

  sendMessage$.onValue(({channel, body, nick}) => {
    client.say(channel.name, body);
    addMessage({channel: channel.name, body, nick});
  });

  join$.onValue(::client.join);

  // getChannels$.delay(500).onValue(() => {
  //   CHANNELS.map(createChannel);
  // });

  part$.delay(500).onValue(removeChannel);
}

