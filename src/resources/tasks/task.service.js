const tasksRepo = require('./task.memory.repository');

const getAll = async (boardId) => {
  const tasks = await tasksRepo.getAll();
  return tasks.filter(task => task.boardId === boardId);
};
const getById = async (boardId, id) => {
  const tasks = await tasksRepo.getAll();
  const tasksWithBoardId = tasks.filter(task => task.boardId === boardId);
  return tasksWithBoardId.find(task => task.id === id);
};
const create = async (boardId, task) => {
  const createdTask = task;
  createdTask.boardId = boardId;
  const newTask = await tasksRepo.create(createdTask);
  return newTask;
};
const update = async (task) => {
  const updatedTask = await tasksRepo.update(task);
  return updatedTask;
};
const remove = async (boardId, id) => {
  await tasksRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
