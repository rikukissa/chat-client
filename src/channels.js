/*
 * Public API for business logic
 */

import Bacon from 'baconjs';
import {without} from 'lodash';

/*
 * Outgoing
 */

export const getChannels$ = new Bacon.Bus();
export const part$ = new Bacon.Bus();
export const join$ = new Bacon.Bus();

/*
 * Incoming
 */

const removeChannel$ = new Bacon.Bus();
const restoreChannel$ = new Bacon.Bus();
const addChannel$ = new Bacon.Bus();

export const createChannel$ = addChannel$.map(name => ({
  name,
  unread: 0,
  notifications: {
    message: false,
    join: false
  }
}));

/*
 * Public store API
 */

export const channels$ = Bacon.update([],
  [createChannel$.merge(restoreChannel$)], create,
  [removeChannel$], remove
);

function create(channels, channel) {
  return channels.concat(channel);
}

function remove(channels, channel) {
  return without(channels, channel);
}

/*
 * Public API used by IOs
 */

export function joinChannel(channelName) {
  join$.push(channelName);
}

export function partChannel(channel) {
  // Optimistic removal
  removeChannel$.push(channel.name);
  part$.push(channel.name);
}

export function createChannel(name) {
  addChannel$.push(name);
}

export function getChannels() {
  getChannels$.push();
}
