import express, { Request, Response } from 'express';
import tasksService from './task.service';
import { Task } from '../../entities/Task';



const router = express.Router();

router.route('/').get(async (req: Request, res: Response) => {
  const {token} = req;
  if (token) {
    const tasks = await tasksService.getAll(req.baseUrl.split('/')[2]);
    res.json(tasks);
  } else {
    res.status(401).send('Unauthorized!');
  }  
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const {token} = req;
  if (token) {
    const { id } = req.params;
    if (id) {
      const task = await tasksService.getById(req.baseUrl.split('/')[2], id);
      res
      .status(task ? 200 : 404)
      .json(task);
    }  
  } else {
    res.status(401).send('Unauthorized!');
  }  
});

router.route('/').post(async (req: Request, res: Response) => {
  const {token} = req;
  if (token) {
    const { body } = req;
    const boardId = req.baseUrl.split('/')[2] || '';
    let task = new Task();
    task = { id: task.id, ...body, boardId};
    await tasksService.create(task);
    res.status(201).json(task);
  } else {
    res.status(401).send('Unauthorized!');
  }  
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const {token} = req;
  if (token) {
    const { body } = req;
    const { id } = req.params;
    const boardId = req.baseUrl.split('/')[2] || '';
    const task = { id, ...body, boardId}
    const newTask = await tasksService.update(task);
    res.json(newTask);
  } else {
    res.status(401).send('Unauthorized!');
  }  
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  const {token} = req;
  if (token) {
    const { id } = req.params;
    const boardId = req.baseUrl.split('/')[2] || '';
    const task = await tasksService.remove(id, boardId);
    if (task) {
      res.status(200).json(null);
    } else {
      res.status(404).json({"message": "Not found!"});
    }   
    } else {
    res.status(401).send('Unauthorized!');
  }  
});

export default router;
