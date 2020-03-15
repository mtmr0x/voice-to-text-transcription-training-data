import logger from './logger';

import { User } from './models/User';
import { Task } from './models/Task';
import { AverageByCountry } from './models/AverageByCountry';
import { AverageByUser } from './models/AverageByUser';

export default function (users:Array<User>, tasks:Array<Task>):[Array<AverageByUser>, Array<AverageByCountry>] {
  const log =  logger({ context: 'averageCalculator' });
  log.info('initializing');

  type TimeAggregatorByUser = {
    [key:number]: Array<number>
  }

  log.info('aggregating time of tasks');
  const timeAggregatorByUser:TimeAggregatorByUser = tasks.reduce((acc:TimeAggregatorByUser, curr, i, array) => {
    if (acc[curr.userId]) {
      acc[curr.userId].push(curr.spentTime);
      return acc;
    }

    acc[curr.userId] = [curr.spentTime];

    return acc;
  }, {});

  const timeAverageByUser:Array<AverageByUser> = [];
  const timeAverageByCountry:Array<AverageByCountry> = [];

  log.info('looping into users to get all average times');
  for (let i = 0; users.length > i; i++) {
    const current =  users[i];
    log.info(`looping for user of id ${current.id}`);
    let objUser:AverageByUser;
    let objCountry:AverageByCountry;
    if (timeAggregatorByUser[current.id]) {
      const sum = timeAggregatorByUser[current.id].reduce((a, b) => {
        return a + b;
      }, 0)
      const average = sum / timeAggregatorByUser[current.id].length;
      objUser = { id: current.id, average }
      objCountry = { country: current.country, average };

      timeAverageByUser.push(objUser);
      timeAverageByCountry.push(objCountry);
      continue;
    }
    objUser = { id: current.id, average: 0 }
    objCountry = { country: current.country, average: 0 };

    timeAverageByUser.push(objUser);
    timeAverageByCountry.push(objCountry);
  }

  log.info('Returning to scope above');
  return [timeAverageByUser, timeAverageByCountry];
}

