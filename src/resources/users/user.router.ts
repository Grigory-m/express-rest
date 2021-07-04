import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import usersService from './user.service';
import { toResponse } from '../../common/to_response';
import { User } from '../../entities/User';

const router = express.Router();

router.route('/').get(async (_req: Request, res: Response) => {
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
  let user = new User();
  let { password } = req.body;
  password = bcrypt.hashSync(password, 10);
  user = { id: user.id, ...req.body, password };
  await usersService.create(user);
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
  const user = await usersService.remove(id);
  if (user) {
    res.status(200).json(null);
  } else {
    res.status(404).json({"message": "Not found!"});
  }  
});

export default router;
