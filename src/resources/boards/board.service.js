const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getById(id);
const create = (board) => boardsRepo.create(board);
const update = (board) => boardsRepo.update(board);
const remove = async (id) => {
  const tasks = await tasksService.getAll(id);
  const removedTasks = tasks.map((task) => tasksService.remove(task.id));
  await Promise.all(removedTasks);
  return boardsRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
