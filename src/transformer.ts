import logger from './logger';
import { User } from './models/User';
import { Task } from './models/Task';

export default function (data:string):[Array<User>, Array<Task>] {
  const log = logger({ context: 'tranformer' });
  log.info('initializing...');

  const users:Array<User> = [];
  const tasks:Array<Task> = [];

  const splittedValues = data.split(/\s+/);
  let tasksSplitedValues:Array<string> = [];
  let tasksIndexAddress:number;

  log.info('looping to mount users object');
  for (let i = 0; splittedValues.length > i; i++) {
    if (i === 0) {
      continue;
    }

    // The regex below verify letter characters with length of 2
    if (splittedValues[i + 1].match(/([a-zA-Z]){2}/)) {
      log.info(`inserting new user with id ${splittedValues[i]} to its list`);
      users.push({
        id: parseInt(splittedValues[i], 10),
        country: splittedValues[i + 1]
      });
    }

    log.info('checking if users data are satisfied with its count index address');
    if (users.length === parseInt(splittedValues[0], 10)) {
      log.info('users are fulfilled. Beginning to insert tasks');
      tasksSplitedValues = splittedValues.slice(i + 3);
      tasksIndexAddress = parseInt(splittedValues[i + 1], 10);
      log.info('breaking loop');
      break;
    } else {
      log.info('jumping to next index to finish users');
      continue;
    }
  }
  const tasksListedValues:Array<Array<string>> = [];
  log.info('reorganizing tasks');
  tasksSplitedValues.forEach((_, i, arr) => !(i % 3) ? tasksListedValues.push(arr.slice(i, i + 3)) : '');

  log.info('looping to get tasks');
  for (let i = 0; tasksListedValues.length > i; i++) {
    const current = tasksListedValues[i];
    if (current.length !== 3) {
      log.warn('this item has no enough length information to become a task item. Skipping it.');
      continue;
    }

    tasks.push({
      id: parseInt(current[0], 10),
      userId: parseInt(current[1], 10),
      spentTime: parseInt(current[2], 10)
    });
  }

  return [users, tasks];
}
