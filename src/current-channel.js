import Bacon from 'baconjs';
import {createChannel$} from 'channels';


export const selectChannel$ = new Bacon.Bus();

selectChannel$.onValue(chan => window.localStorage.setItem('current-channel', chan.name));

export const currentChannel$ = Bacon.update(null,
  [selectChannel$], (state, channel) => channel,
  [createChannel$], (state, channel) => {
    if(channel.name === window.localStorage.getItem('current-channel')) {
      return channel;
    }
    return state || channel;
  }
);

export function selectChannel(channel) {
  selectChannel$.push(channel);
}
