const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

/**
 * Returns all boards
 * @returns {array} Array of boards
 */
const getAll = () => boardsRepo.getAll();

/**
 * Returns board by id
 * @param {string} id 
 * @returns {object} a required board
 */
const getById = (id) => boardsRepo.getById(id);

/**
 * Creates new board
 * @param {object} board 
 * @returns void
 */
const create = (board) => boardsRepo.create(board);

/**
 * Returns updated board
 * @param {object} board 
 * @returns {object} an updated board
 */
const update = (board) => boardsRepo.update(board);

/**
 * Deletes board by id
 * @param {string} id 
 * @returns void
 */
const remove = async (id) => {
  const tasks = await tasksService.getAll(id);
  const removedTasks = tasks.map((task) => tasksService.remove(task.id));
  await Promise.all(removedTasks);
  boardsRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
