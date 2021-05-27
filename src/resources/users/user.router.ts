import express, { Request, Response } from 'express';
import User from './user.model';
import usersService from './user.service';

const router = express.Router();

router.route('/').get(async (res: Response) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const user: User | undefined = await usersService.getById(req.params.id);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req: Request, res: Response) => {
  const { body } = req;
  const user = new User(body);  
  await usersService.create(user);
  res.status(201).json(User.toResponse(user));
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const { body } = req;
  const user = new User({ id: req.params.id, ...body});
  const newUser = await usersService.update(user);
  res.json(newUser);
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  await usersService.remove(req.params.id);
  res
    .status(200)
    .json(null);
});

export default router;
