import { Meteor } from 'meteor/meteor';
import message from 'antd/lib/message';

import '../api/Users/methods';

function callback(error) {
  if (error) {
    message.error(error.reason || error);
  }
}

export default function dispatch() {
  if (arguments.length == 0) {
    return;
  }

  if (typeof arguments[0] !== 'string') {
    message.error('First parameter of dispach must be a string');
  }

  let args = Array.from(arguments);
  if (typeof args[args.length - 1] !== 'function') {
    args = [...args, callback];
  }

  const action = args[0];

  switch (action) {
    case 'users.logout':
      args.shift();
      Meteor.logout(...args);
      break;
    case 'users.loginWithPassword':
      args.shift();
      Meteor.loginWithPassword(...args);
      break;
    default:
      Meteor.call(...args);
      break;
  }
}
