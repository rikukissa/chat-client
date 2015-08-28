import Bacon from 'baconjs';
import {currentChannel$} from 'current-channel';

/*
 * Outgoing
 */

export const sendMessage$ = new Bacon.Bus();

/*
 * Incoming
 */

const addMessage$ = new Bacon.Bus();

/*
 * Outgoing events
 */

export const message$ = addMessage$;

/*
 * Public store API
 */

export const messages$ = Bacon.update([],
  [addMessage$], create
);

function create(messages, message) {
  const msg = {
    ...message,
    id: messages.length,
    received: Date.now()
  };

  return messages.concat(msg);
}

/*
 * Public API
 */

export function sendMessage(body) {
  currentChannel$.sampledBy(Bacon.once()).map(channel => ({
    channel: channel.name,
    body,
    nick: 'Riku'
  })).onValue(::sendMessage$.push);
}

export function addMessage(message) {
  addMessage$.push(message);
}
