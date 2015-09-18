import Bacon from 'baconjs';
import {findWhere} from 'lodash';
import {message$} from 'messages';
import {currentChannels$} from 'current-channel';

export const notifications$ = Bacon.update([],
  [message$, currentChannels$], notify,
  [currentChannels$.toEventStream()], removeNotifications,
);

function notify(notifications, message, currentChannels) {
  if(findWhere(currentChannels, {name: message.channel})) {
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

function removeNotifications(notifications, currentChannels) {
  return notifications
  .filter(notification => findWhere(currentChannels, {
    name: notification.channelName
  }));
}

