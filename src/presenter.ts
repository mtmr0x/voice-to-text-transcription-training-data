import logger from './logger';

export default function (avgUserTime:Array<{[key:number]: number}>, avgCountryTime:Array<{[key:string]:number}>) {
  const log = logger({ context: 'Presenter' });
  log.info('initializing');
  return null;
}

