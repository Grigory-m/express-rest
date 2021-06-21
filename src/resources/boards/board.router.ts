import express, { Request, Response } from 'express';
import { v4 as uuid} from 'uuid';
import { Board } from '../../entities/Board';
import { Columns } from '../../entities/Columns';
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
  const { title: boardTitle, columns } = req.body;
  const newColumns: Columns[] = columns.map((column: { title: string; order: number; }) => {
    const { title, order } = column;
    const newColumn = new Columns();
    newColumn.id = uuid();
;   newColumn.title = title;
    newColumn.order = order;  
    return newColumn;
  });
  const board = new Board();
  board.title = boardTitle;
  board.columns = newColumns;  
  await boardsService.create(board);
  res.status(201).json(board);
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  const board = { id, ...body };
  const newBoard = await boardsService.update(board);
  res.json(newBoard);
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  const { id } = req.params;
  const board = await boardsService.remove(id);
  if (board) {
    res.status(200).json(null);
  } else {
    res.status(404).json("Not found!");
  }  
});

export default router;
