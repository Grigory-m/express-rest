const router = require('express').Router();
const Board = require('./board.model');
const Column = require('./column.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  await tasksService.getAll(req.params.id);
  res
    .status(board ? 200 : 404)
    .json(board);
});

router.route('/').post(async (req, res) => {
  const { title, columns: col } = req.body;
  const columns = col.map((item) => new Column(item));
  const board = new Board({ title, columns });  
  await boardsService.create(board);
  res.status(201).json(board);
});

router.route('/:id').put(async (req, res) => {
  const { body } = req;
  const board = new Board({ id: req.params.id, ...body});
  const newBoard = await boardsService.update(board);
  res.json(newBoard);
});

router.route('/:id').delete(async (req, res) => {
  await boardsService.remove(req.params.id);
  res
    .status(200)
    .json(null);
});

module.exports = router;
