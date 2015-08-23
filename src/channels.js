/*
 * Public API for business logic
 */

import Bacon from 'baconjs';
import {without} from 'lodash';
import {getUserChannels, part} from 'api/channels';
import {message$} from 'messages';

const createChannel$ = new Bacon.Bus();
const removeChannel$ = new Bacon.Bus();
const restoreChannel$ = new Bacon.Bus();
const createdChannel$ = createChannel$.map(name => ({
  name,
  unread: 0,
  notifications: {
    message: false,
    join: false
  }
}));

const currentChannelBus$ = new Bacon.Bus();

/*
 * Public store API
 */

export const currentChannel$ = Bacon.update(null,
  [currentChannelBus$], (state, channel) => channel,
  [createdChannel$], (state, channel) => {
    return state || channel;
  }
);

export function toProperty(initial) {
  return Bacon.update(initial,
    [createdChannel$.merge(restoreChannel$)], createChannel,
    [message$, currentChannel$], notifyChannels,
    [currentChannelBus$], removeChannelNotifications,
    [removeChannel$], removeChannel
  );
}

function createChannel(channels, channel) {
  return channels.concat(channel);
}

function removeChannel(channels, channel) {
  return without(channels, channel);
}

function notifyChannels(channels, message, currentChannel) {
  return channels.map((channel) => {
    if(channel.name !== message.channel || channel === currentChannel) {
      return channel;
    }

    channel.unread++;
    channel.notifications.message = true;
    return channel;
  });
}


function removeChannelNotifications(channels, currentChannel) {
  return channels.map((channel) => {
    if(channel.name !== currentChannel.name) {
      return channel;
    }

    channel.unread = 0;
    channel.notifications.message = false;
    channel.notifications.join = false;
    return channel;
  });
}


/*
 * Public API
 */

export function partChannel(channel) {
  removeChannel$.push(channel);

  Bacon
    .fromPromise(part(channel.name))
    .onError(() => restoreChannel$.push(channel));
}

export function selectChannel(channel) {
  currentChannelBus$.push(channel);
}

export function getChannels() {
  const newChannels$ = Bacon
    .fromPromise(getUserChannels())
    .flatMap(Bacon.fromArray);

  createChannel$.plug(newChannels$);
}
