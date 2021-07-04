import { createLogger, transports, format } from 'winston';

const { combine, timestamp, json } = format;

const logger = createLogger({
  transports: [
    new transports.File({
      filename: './log/info.log',
      level: 'info',
      format: combine(timestamp(), json()),
    }),
    new transports.File({
      filename: './log/error.log',
      level: 'error',
      format: combine(timestamp(), json()),
    }),
    new transports.File({
      filename: './log/warn.log',
      level: 'warn',
      format: combine(timestamp(), json()),
    }),
    new transports.File({
      filename: './log/debug.log',
      level: 'debug',
      format: combine(timestamp(), json()),
    }),
    new transports.File({
      filename: './log/verbose.log',
      level: 'verbose',
      format: combine(timestamp(), json()),
    }),
  ],
});

export default logger;
