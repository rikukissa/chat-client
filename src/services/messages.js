

/*
 * Public API for business logic
 */

import Bacon from 'baconjs';
import {findWhere} from 'lodash';

const create$ = new Bacon.Bus();


/*
 * Public store API
 */

export const message$ = create$;

export function toProperty(initial, channels$, currentChannel$) {
  return Bacon.update(initial,
    [create$, channels$, currentChannel$], create
  );
}

function create(messages, message, channels, currentChannel) {
  const msg = {
    ...message,
    received: Date.now(),
    channel: message.channel || currentChannel.name
  };

  if(findWhere(channels, {name: msg.channel})) {
    return messages.concat(msg);
  }
  return messages;
}


/*
 * Public API
 */

export function sendMessage(body) {
  create$.push({
    body,
    nick: 'Riku'
  });
}

export function addMessage(message) {
  create$.push(message);
}

