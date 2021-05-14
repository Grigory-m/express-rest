const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  res
    .status(board ? 200 : 401)
    .json(board);
});

router.route('/').post(async (req, res) => {
  const { body } = req;
  const board = new Board(body);  
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
    .status(204)
    .json(null);
});

module.exports = router;
