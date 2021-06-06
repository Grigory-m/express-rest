import express, { Request, Response } from 'express';
import Board from './board.model';
import Column from './column.model';
import boardsService from './board.service';
import tasksService from '../tasks/task.service';

const router = express.Router();

router.route('/').get(async (_, res: Response) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const { id } = req.params;
  const board = await boardsService.getById(id);
  await tasksService.getAll(id);
  res
    .status(board ? 200 : 404)
    .json(board);
});

router.route('/').post(async (req: Request, res: Response) => {
  const { title, columns: col } = req.body;
  const columns = col.map((item: Column) => new Column(item));
  const board = new Board({ title, columns });
  await boardsService.create(board);
  res.status(201).json(board);
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  const board = new Board({ id, ...body });
  const newBoard = await boardsService.update(board);
  res.json(newBoard);
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  const { id } = req.params;
  await boardsService.remove(id);
  res
    .status(200)
    .json(null);
});

export default router;
