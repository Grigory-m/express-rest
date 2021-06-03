import { createLogger, transports, format } from 'winston';
const { combine, timestamp, json } = format;

const logger = createLogger({
  transports: [
      new transports.File({
        filename: './log/requests.log',
        level: 'info',
        format: combine(
          timestamp(),
          json()
        )
      }),
      new transports.File({
        filename: './log/error.log',
        level: 'error',
        format: combine(
          timestamp(),
          json()
        )
      })
  ]
});

export default logger;