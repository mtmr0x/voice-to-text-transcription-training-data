import logger from './logger';

import { AverageByCountry } from './models/AverageByCountry';
import { AverageByUser } from './models/AverageByUser';

export default function (avgUserTime:Array<AverageByUser>, avgCountryTime:Array<AverageByCountry>):string {
  const log = logger({ context: 'Presenter' });
  log.info('initializing');
  log.info('sorting users payload');
  const sortedAvgByUser = avgUserTime.sort((a, b) => a.id - b.id);
  log.info('sorting countries payload');
  const sortedAvgByCountry = avgCountryTime.sort((a, b) => {
    if ( a.country < b.country ){
      return -1;
    }
    if ( a.country > b.country ){
      return 1;
    }
    return 0;
  });

  let outputText:string = '';

  log.info('adding users payload to output text');
  for (let i = 0; sortedAvgByUser.length > i; i++) {
    const current = sortedAvgByUser[i]
    outputText = outputText.concat('\n' + current.id + ' ' + current.average);
  }

  log.info('adding countries payload to output text');
  for (let i = 0; sortedAvgByCountry.length > i; i++) {
    const current = sortedAvgByCountry[i]
    outputText = outputText.concat('\n' + current.country + ' ' + current.average);
  }

  log.info(`Done! Output text is: ${outputText}`);

  return outputText;
}

