const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.baseUrl.split('/')[2]);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getById(req.baseUrl.split('/')[2], req.params.id);
  res
    .status(task ? 200 : 404)
    .json(task);
});

router.route('/').post(async (req, res) => {
  const { body } = req;  
  const task = new Task(body);
  await tasksService.create(req.baseUrl.split('/')[2], task);
  res.status(201).json(task);
});

router.route('/:id').put(async (req, res) => {
  const { body } = req;
  const newTask = await tasksService.update(body);
  res.json(newTask);
});

router.route('/:id').delete(async (req, res) => {
  await tasksService.remove(req.baseUrl.split('/')[2], req.params.id);
  res
    .status(204)
    .json(null);
});

module.exports = router;
