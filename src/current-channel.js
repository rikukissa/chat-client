import Bacon from 'baconjs';
import {createChannel$} from 'channels';
import {without} from 'lodash';


export const toggleChannel$ = new Bacon.Bus();
export const selectChannel$ = new Bacon.Bus();

function getStoredChannels() {
  return JSON.parse(window.localStorage.getItem('current-channels'));
}

export const currentChannels$ = Bacon.update([],
  [toggleChannel$], toggle,
  [selectChannel$], select,

  [createChannel$], (channels, channel) => {
    if(getStoredChannels().indexOf(channel) > -1) {
      return channels.concat(channel);
    }
    return [channel];
  }
);

currentChannels$.onValue(channels => {
  window.localStorage.setItem(
    'current-channels',
    JSON.stringify(channels.map(channel => channel))
  );
});

function select(channels, channel) {
  return [channel];
}

function toggle(channels, channel) {
  if(channels.indexOf(channel) > -1) {
    return without(channels, channel);
  }
  return channels.concat(channel);
}

export function selectChannel(channel) {
  selectChannel$.push(channel);
}

export function toggleChannel(channel) {
  toggleChannel$.push(channel);
}

