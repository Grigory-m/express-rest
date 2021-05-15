const tasksRepo = require('./task.memory.repository');
// const boardsRepo = require('./board.memory.repository');

const getAll = async (boardId) => {
  // const board = await boardsRepo.getById(boardId);
  const tasks = await tasksRepo.getAll();
  return tasks.filter(task => task.boardId === boardId);
};
const getById = async (boardId, id) => {
  const tasks = await tasksRepo.getAll();
  return tasks.find(task => task.id === id && task.boardId === boardId);
};
const create = async (boardId, task) => {
  const createdTask = task;
  createdTask.boardId = boardId;
  const newTask = await tasksRepo.create(createdTask);
  return newTask;
};
// const update = (boardId, task) => tasksRepo.update(board);
// const remove = (boardId, id) => tasksRepo.remove(id);

module.exports = { getAll, getById, create };
