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

  type TimeAggregatorByCountry = {
    [key:string]: Array<number>
  }

  log.info('aggregating time of tasks by user');
  const timeAggregatorByUser:TimeAggregatorByUser = tasks.reduce((acc:TimeAggregatorByUser, curr) => {
    if (acc[curr.userId]) {
      acc[curr.userId].push(curr.spentTime);
      return acc;
    }

    acc[curr.userId] = [curr.spentTime];

    return acc;
  }, {});

  log.info('aggregating time of tasks by country');
  const timeAggregatorByCountry = users.reduce((acc:TimeAggregatorByCountry, curr) => {
    const currentUserSpentTime = tasks.filter(t => t.userId === curr.id).map(t => t.spentTime);
    if (acc[curr.country]) {
      currentUserSpentTime.map(c => acc[curr.country].push(c));
      return acc;
    }
    acc[curr.country] = [];
    currentUserSpentTime.map(c => acc[curr.country].push(c));
    return acc;
  }, {});

  const timeAverageByUser:Array<AverageByUser> = [];
  const timeAverageByCountry:Array<AverageByCountry> = [];

  log.info('looping into users to get all average times');
  for (let i = 0; users.length > i; i++) {
    const current =  users[i];
    log.info(`looping for user of id ${current.id}`);
    let objUser:AverageByUser;
    if (timeAggregatorByUser[current.id]) {
      const sum = timeAggregatorByUser[current.id].reduce((a, b) => {
        return a + b;
      }, 0)
      const average = sum / timeAggregatorByUser[current.id].length;
      objUser = { id: current.id, average: (average).toFixed(2) }

      timeAverageByUser.push(objUser);
      continue;
    }
    objUser = { id: current.id, average: (0).toFixed(2) }

    timeAverageByUser.push(objUser);
  }

  log.info('looping into tasks to get all average times');
  const timeAggregatorByCountryKeys = Object.keys(timeAggregatorByCountry);

  for (let i = 0; timeAggregatorByCountryKeys.length > i; i++) {
    const currentList:Array<number> = timeAggregatorByCountry[timeAggregatorByCountryKeys[i]];
    const currentCountry:string = timeAggregatorByCountryKeys[i];

    let objCountry:AverageByCountry;

    if (timeAggregatorByCountry[currentCountry].length) {
      const sum = currentList.reduce((a, b) => {
        return a + b;
      }, 0)
      const average = sum / currentList.length;
      objCountry = { country: currentCountry, average: (average).toFixed(2) };
      timeAverageByCountry.push(objCountry);
      continue;
    }

    objCountry = { country: currentCountry, average: (0).toFixed(2) };
    timeAverageByCountry.push(objCountry);
  }

  log.info('Returning to scope above');
  return [timeAverageByUser, timeAverageByCountry];
}

