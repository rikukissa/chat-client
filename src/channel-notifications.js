import Bacon from 'baconjs';
import {findWhere} from 'lodash';
import {message$} from 'messages';
import {currentChannel$, selectChannel$} from 'current-channel';

export const notifications$ = Bacon.update([],
  [message$, currentChannel$], notify,
  [selectChannel$], removeNotifications,
);

function notify(notifications, message, currentChannel) {
  if(currentChannel && message.channel === currentChannel.name) {
    return notifications;
  }

  const existingNotification = findWhere(notifications, {
    channelName: message.channel
  });

  if(existingNotification) {
    existingNotification.unread++;
    existingNotification.alert = true;
    return notifications;
  }

  return notifications.concat({
    channelName: message.channel,
    alert: true,
    notice: false,
    unread: 1
  });
}

function removeNotifications(notifications, currentChannel) {
  return notifications
    .filter(notification => notification.channelName !== currentChannel.name);
}

