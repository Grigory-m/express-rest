import express, { Request, Response } from 'express';
import { Board } from '../../entities/Board';
import { Columns } from '../../entities/Columns';
import boardsService from './board.service';
import tasksService from '../tasks/task.service';

declare module 'express' {  
  interface Request {
    token?: string;
  }
}

const router = express.Router();

router.route('/').get(async (req: Request, res: Response) => {
  const {token} = req;
  if (token) {
    const boards = await boardsService.getAll();
    res.json(boards);
  } else {
    res.status(401).send('Unauthorized!');
  }    
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const {token} = req;
  if (token) {
    const { id } = req.params;
    const board = await boardsService.getById(id);
    await tasksService.getAll(id);
    res
      .status(board ? 200 : 404)
      .json(board);
  } else {
    res.status(401).send('Unauthorized!');
  }      
});

router.route('/').post(async (req: Request, res: Response) => {
  const {token} = req;
  if (token) {
    const { columns } = req.body;
    const newColumns: Columns[] = columns.map((column: { title: string; order: number; }) => {
      let newColumn = new Columns();
      newColumn  = { id: newColumn.id, ...column};
      return newColumn;
    });
    let board = new Board();
    board = { id: board.id, ...req.body, columns: newColumns };
    await boardsService.create(board);
    res.status(201).json(board);
  } else {
    res.status(401).send('Unauthorized!');
  }   
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const {token} = req;
  if (token) {
    const { body } = req;
    const { id } = req.params;
    const board = { id, ...body };
    const newBoard = await boardsService.update(board);
    res.json(newBoard);
  } else {
    res.status(401).send('Unauthorized!');
  }     
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  const {token} = req;
  if (token) {
    const { id } = req.params;
    const board = await boardsService.remove(id);
    if (board) {
      res.status(200).json(null);
    } else {
      res.status(404).json({"message": "Not found!"});
    }  
  } else {
    res.status(401).send('Unauthorized!');
  }     
});

export default router;
