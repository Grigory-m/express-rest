const tasks = [];

/**
 * Returns all tasks
 * @returns {array} Array of tasks
 */
const getAll = async () => tasks;

/**
 * Returns task by id
 * @param {string} id 
 * @returns {object} a required task
 */
const getById = async (id) => tasks.find(task => task.id === id);

/**
 * Creates new task
 * @param {object} task 
 * @returns void
 */
const create = async (task) => tasks.push(task);

/**
 * Returns updated task
 * @param {object} task 
 * @returns {object} an updated task
 */
const update = async (task) => {
  const index = tasks.findIndex(item => task.id === item.id);
  tasks[index] = task;
  return task;
};

/**
 * Deletes task by id
 * @param {string} id 
 * @returns void
 */
const remove = async (id) => {
  const index = tasks.findIndex(item => id === item.id);
  tasks.splice(index, 1);
};

module.exports = { getAll, getById, create, update, remove, tasks };
