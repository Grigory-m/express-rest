import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import onFinished from 'on-finished';
import boardRouter from './resources/boards/board.router';
import userRouter from './resources/users/user.router';
import taskRouter from './resources/tasks/task.router';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

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
    console.log(`${url} ${query} ${body}`);
  });

  onFinished(res, (_, res) => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    console.log(`${statusCode} ms: ${ms}`);
  })
});

app.use('/boards', boardRouter);
app.use('/users', userRouter);
app.use('/boards/:boardId/tasks', taskRouter);

export default app;
