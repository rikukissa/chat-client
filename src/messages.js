import Bacon from 'baconjs';
import Router from 'routes';
import PouchDB from 'pouchdb';

import {joinChannel} from 'channels';
import {currentChannels$} from 'current-channel';

const db = new PouchDB('messages');

/*
 * Outgoing
 */

export const sendMessage$ = new Bacon.Bus();

/*
 * Incoming
 */

const addMessage$ = new Bacon.Bus();

const load$ = Bacon
  .fromPromise(db.allDocs({include_docs: true}))
  .map(res => res.rows.map(row => row.doc));

/*
 * Outgoing events
 */

export const message$ = addMessage$.map(message => ({
  ...message,
  id: Date.now(),
  received: Date.now()
}));


message$.onValue((message) => {
  db.post(message);
});

function create(messages, message) {
  return messages.concat(message);
}

// Router for handling user commands like /join
const messageRouter = Router();

messageRouter.addRoute('/join :channel', function({channel}) {
  joinChannel(channel);
});

function sendMessage(body) {

  const match = messageRouter.match(body);

  if(match) {
    return match.fn(match.params);
  }

  currentChannels$.sampledBy(Bacon.once())
  .filter(channels => channels.length > 0)
  .map(channels => ({
    channel: channels[0],
    body,
    nick: 'Riku'
  })).onValue(::sendMessage$.push);

  currentChannels$.sampledBy(Bacon.once())
  .filter(channels => channels.length === 0)
  .map(channels => ({
    body: 'No channel selected',
    type: 'error'
  }))
  .onValue(addMessage);
}

/*
 * Public store API
 */

export const messages$ = Bacon.update([],
  [message$], create,
  [load$], (messages, loaded) => loaded
);

/*
 * Public API
 */

export {sendMessage as sendMessage};
export function addMessage(message) {
  addMessage$.push(message);
}
