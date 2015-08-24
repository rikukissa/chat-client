import Bacon from 'baconjs';
import {createChannel$} from 'channels';


export const selectChannel$ = new Bacon.Bus();

export const currentChannel$ = Bacon.update(null,
  [selectChannel$], (state, channel) => channel,
  [createChannel$], (state, channel) => {
    return state || channel;
  }
);

export function selectChannel(channel) {
  selectChannel$.push(channel);
}
