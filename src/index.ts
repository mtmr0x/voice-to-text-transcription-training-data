import logger from './logger';

(function() {
  const log = logger({ context: 'App entry point' });
  log.info('initializing');

  const filePath = process.argv[2];
  log.info(filePath);
  // get file
  // get file buffer as string
  // parse string
})()

