import {times} from 'lodash';
import Chance from 'chance';
const chance = new Chance();

export const CHANNELS = times(15, ::chance.hashtag).map(tag => '#' + tag);

export function getUserChannels() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(CHANNELS), 500);
  });
}

export function part() {
  return new Promise((resolve, reject) => {
    if(Math.random() < 0.1) {
      return setTimeout(reject(), 500);
    }

    setTimeout(resolve, 500);
  });
}
