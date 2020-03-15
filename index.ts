import * as fs from 'fs';
import * as path from 'path';

import logger from './src/logger';
import receiver from './src/receiver';

(function() {
  const log = logger({ context: 'App entry point' });
  log.info('initializing');

  const filePathArg = process.argv[2];
  if (!filePathArg) {
    log.error('You must pass one argument with a file path to be parsed.');
    process.exit(1);
  }

  const filePath = path.join(__dirname, filePathArg);

  fs.readFile(filePath, { encoding: 'utf-8' }, (err, data:string) => {
    log.info('reading file from system');
    if (!err) {
      log.info('received file contents. Executing receiver...');
      return receiver(data);
    }
    log.error(`could not read from file. Got the following error: ${err}`);
    process.exit(1);
    return false;
  })
})()

