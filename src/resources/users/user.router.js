const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res
    .status(user ? 200 : 401)
    .json(user);
});

router.route('/').post(async (req, res) => {
  const { body } = req;
  const user = new User(body);  
  await usersService.create(user);
  res.status(201).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const { body } = req;
  const user = new User({ id: req.params.id, ...body});
  const newUser = await usersService.update(user);
  res.json(newUser);
});

router.route('/:id').delete(async (req, res) => {
  await usersService.remove(req.params.id);
  res
    .status(204)
    .json(null);
});

module.exports = router;
