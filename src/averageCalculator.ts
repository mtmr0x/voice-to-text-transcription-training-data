import logger from './logger';

import { User } from './models/User';
import { Task } from './models/Task';

export default function (users:Array<User>, tasks:Array<Task>):[Array<{[key:number]:number}>, Array<{[key:string]:number}>] {
  const log =  logger({ context: 'averageCalculator' });
  log.info('initializing');

  type TimeAgregatorByUser = {
    [key:number]: Array<number>
  }

  const timeAgregatorByUser:TimeAgregatorByUser = tasks.reduce((acc:TimeAgregatorByUser, curr, i, array) => {
    if (acc[curr.userId]) {
      acc[curr.userId].push(curr.spentTime);
      return acc;
    }

    acc[curr.userId] = [curr.spentTime];

    return acc;
  }, {});

  type TimeAverage = {
    [key:number]: number
  }

  const timeAverageByUser:Array<{[key:number]:number}> = [];
  const timeAverageByCountry:Array<{[key:string]:number}> = [];

  for (let i = 0; users.length > i; i++) {
    const current =  users[i];
    const objUser:{[key:number]: number} = {};
    const objCountry:{[key:string]: number} = {};
    if (timeAgregatorByUser[current.id]) {
      const sum = timeAgregatorByUser[current.id].reduce((a, b) => {
        return a + b;
      }, 0)
      const average = sum / timeAgregatorByUser[current.id].length;
      objUser[current.id] = average;
      objCountry[current.country] = average;

      timeAverageByUser.push(objUser);
      timeAverageByCountry.push(objCountry);
      continue;
    }
    objUser[current.id] = 0;
    objCountry[current.country] = 0;

    timeAverageByUser.push(objUser);
    timeAverageByCountry.push(objCountry);
  }

  console.log('\n\n', timeAverageByUser, '\n\n');
  console.log('\n\n', timeAverageByCountry, '\n\n');

  return [timeAverageByUser, timeAverageByCountry];
}
