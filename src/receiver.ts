import logger from './logger';
import transformer from './transformer';

export default function (data: string) {
  const log =  logger({ context: 'Receiver' });

  log.info('getting data from transformer module');
  const [users, tasks] = transformer(data);
}

