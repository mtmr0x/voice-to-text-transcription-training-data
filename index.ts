import * as fs from 'fs';
import * as path from 'path';

import logger from './src/logger';

(function() {
  const log = logger({ context: 'App entry point' });
  log.info('initializing');

  const filePathArg = process.argv[2];
  log.info(filePathArg);
  if (!filePathArg) {
    log.error('You must pass one argument with a file path to be parsed.');
  }

  const filePath = path.join(__dirname, filePathArg);
  log.info(filePath);

  // get file
  // get file buffer as string
  // parse string
})()

