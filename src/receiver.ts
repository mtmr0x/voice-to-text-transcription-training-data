import logger from './logger';

import transformer from './transformer';
import averageCalculator from './averageCalculator';

export default function (data: string) {
  const log =  logger({ context: 'Receiver' });
  log.info('initializing');

  log.info('getting data from transformer module');
  const [users, tasks] = transformer(data);

  log.info('getting average time data');
  const [timeAverageByUser, timeAverageByCountry] = averageCalculator(users, tasks);

}

