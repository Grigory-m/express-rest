import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import onFinished from 'on-finished';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import logger from './common/logger';
import HttpException from './common/errors/exception';
import boardRouter from './resources/boards/board.router';
import userRouter from './resources/users/user.router';
import taskRouter from './resources/tasks/task.router';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const { INTERNAL_SERVER_ERROR } = StatusCodes;

process.on('uncaughtException', (err) => {
  logger.error(`${err.message}`);   
  logger.on('finish', () => {
    process.exit(1);  
  });    
});

process.on('unhandledRejection', (reason) => {
  logger.error(`${reason}`);   
  logger.on('finish', () => {
    process.exit(1);  
  });    
});

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }    
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const { url, query, body } = req;
  const start = Date.now();
  next();

  onFinished(req, () => {    
    logger.info(`Request: url: ${url}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)}`);
  });

  onFinished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    logger.info(`Response: status: ${statusCode} time: ${ms}ms`);
  })
});

app.use('/boards', boardRouter);
app.use('/users', userRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use((err: HttpException, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || INTERNAL_SERVER_ERROR;
  const message = err.message || getReasonPhrase(INTERNAL_SERVER_ERROR);
  logger.error(`Status: ${status}, message: ${message}`);
  res.status(status).send(message); 
  _next();
})

export default app;
