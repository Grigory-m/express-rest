const tasksRepo = require('./task.memory.repository');

const { tasks } = tasksRepo;
/**
 * Returns tasks by boardId
 * @param {string} boardId 
 * @returns {array} array of tasks
 */
const getAll = async (boardId) => tasks.filter(task => task.boardId === boardId);

/**
 * Returns tasks by boardId and task id
 * @param {string} boardId 
 * @param {string} id 
 * @returns {object} tasks with boardId and task id
 */
const getById = async (boardId, id) => {
  const tasksWithBoardId = tasks.filter(task => task.boardId === boardId);
  return tasksWithBoardId.find(task => task.id === id);
};

/**
 * Returns task with userId
 * @param {string} userId 
 * @returns {object} task with userId
 */
const getByUserId = async (userId) => tasksRepo.tasks.find((task => task.userId === userId));

/**
 * Creates new task
 * @param {string} boardId 
 * @param {object} task 
 * @returns {object} new task
 */
const create = async (boardId, task) => {
  const createdTask = task;
  createdTask.boardId = boardId;
  const newTask = await tasksRepo.create(createdTask);
  return newTask;
};

/**
 * Update task
 * @param {object} task 
 * @returns {object} an updated task
 */
const update = async (task) => {
  const updatedTask = await tasksRepo.update(task);
  return updatedTask;
};

/**
 * Remove task by id and boardId
 * @param {string} boardId 
 * @param {string} id 
 * @returns void
 */
const remove = async (boardId, id) => {
  await tasksRepo.remove(id);
};

module.exports = { getAll, getById, getByUserId, create, update, remove };
