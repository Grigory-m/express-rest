const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.baseUrl.split('/')[2]);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const board = await tasksService.getById(req.params.id);
  res
    .status(board ? 200 : 401)
    .json(board);
});

router.route('/').post(async (req, res) => {
  const { body } = req;  
  const task = new Task(body);
  await tasksService.create(req.baseUrl.split('/')[2], task);
  res.status(201).json(task);
});

// router.route('/:id').put(async (req, res) => {
//   const { body } = req;
//   const board = new Board({ id: req.params.id, ...body});
//   const newBoard = await boardsService.update(board);
//   res.json(newBoard);
// });

// router.route('/:id').delete(async (req, res) => {
//   await boardsService.remove(req.params.id);
//   res
//     .status(204)
//     .json(null);
// });

module.exports = router;
