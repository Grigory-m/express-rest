import express, { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import tasksService from './task.service';
import { Task } from '../../entities/Task';

const router = express.Router();

router.route('/').get(async (req: Request, res: Response) => {
  const tasks = await tasksService.getAll(req.baseUrl.split('/')[2]);
  res.json(tasks);
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id) {
    const task = await tasksService.getById(req.baseUrl.split('/')[2], id);
    res
    .status(task ? 200 : 404)
    .json(task);
  }  
});

router.route('/').post(async (req: Request, res: Response) => {
  const { body } = req;
  const boardId = req.baseUrl.split('/')[2] || '';
  const newTask = new Task();
  const { title, order, description, userId, columnId } = body;
  newTask.id = uuid();
  newTask.title = title;
  newTask.order = order;
  newTask.description = description;
  newTask.userId = userId;
  newTask.columnId = columnId;
  newTask.boardId = boardId;
  await tasksService.create(newTask);
  res.status(201).json(newTask);
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  const task = { id, ...body}
  const newTask = await tasksService.update(task);
  res.json(newTask);
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  const { id } = req.params;
  await tasksService.remove(id);
  res
    .status(204)
    .json(null);
});

export default router;
