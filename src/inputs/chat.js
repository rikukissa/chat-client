import {addMessage} from 'services/messages';
import Chance from 'chance';
import {CHANNELS} from 'api/channels';

const chance = new Chance();

function sendRandomMessage() {
  addMessage({
    channel: CHANNELS[Math.floor(CHANNELS.length * Math.random())],
    nick: chance.first(),
    body: chance.sentence()
  });
  setTimeout(sendRandomMessage, Math.random() * 4000);
}

sendRandomMessage();
