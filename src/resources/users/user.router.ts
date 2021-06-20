import express, { Request, Response } from 'express';
import usersService from './user.service';
import { toResponse } from '../../common/to_response';

const router = express.Router();

router.route('/').get(async (_, res: Response) => {
  const users = await usersService.getAll();
  res.json(users.map(toResponse));
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await usersService.getById(id);
  if (user) {
    res.json(toResponse(user));
  }  
});

router.route('/').post(async (req: Request, res: Response) => {
  const { body } = req;
  const user = await usersService.create(body);
  res.status(201).json(toResponse(user));
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  const user = { id, ...body};
  const newUser = await usersService.update(user);
  if (newUser) {
    res.json(toResponse(newUser));
  }  
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  const { id } = req.params;
  await usersService.remove(id);
  res
    .status(200)
    .json(null);
});

export default router;
