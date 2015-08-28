import Bacon from 'baconjs';
import {currentChannel$} from 'current-channel';
import PouchDB from 'pouchdb';

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

/*
 * Public store API
 */

export const messages$ = Bacon.update([],
  [message$], create,
  [load$], (messages, loaded) => loaded
);

function create(messages, message) {
  return messages.concat(message);
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
