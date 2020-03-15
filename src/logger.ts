import { createLogger, format, transports } from 'winston';

const { combine, printf, label, colorize } = format;

const msgTemplate = printf(info => {
  const d = new Date();
  const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;

  return `=> ${time} [${info.level}] ${info.label}: ${info.message}`;
});

type LoggerConfig = {
  context: string
}

const logger = (config:LoggerConfig) => createLogger({
  format: combine(
    colorize(),
    label({ label: config.context }),
    msgTemplate
  ),
  transports: [new transports.Console()]
});

export default logger;

