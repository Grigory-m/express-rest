import express, { Request, Response } from 'express';
import Board from './board.model';
import Column from './column.model';
import boardsService from './board.service';
import tasksService from '../tasks/task.service';

const router = express.Router();

router.route('/').get(async (res: Response) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const board = await boardsService.getById(req.params['id']);
  await tasksService.getAll(req.params['id']);
  res
    .status(board ? 200 : 404)
    .json(board);
});

router.route('/').post(async (req: Request, res: Response) => {
  const { title, columns: col } = req.body;
  const columns = col.map((item: any) => new Column(item));
  const board = new Board({ title, columns });  
  await boardsService.create(board);
  res.status(201).json(board);
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const { body } = req;
  const board = new Board({ id: req.params['id'], ...body});
  const newBoard = await boardsService.update(board);
  res.json(newBoard);
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  await boardsService.remove(req.params['id']);
  res
    .status(200)
    .json(null);
});

export default router;
