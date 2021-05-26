const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.memory.repository');

/**
 * Returns all users
 * @returns {array} Array of users
 */
const getAll = () => usersRepo.getAll();

/**
 * Returns user by id
 * @param {string} id 
 * @returns {object} a required user
 */
const getById = (id) => usersRepo.getById(id);

/**
 * Creates new user
 * @param {object} user 
 * @returns void
 */
const create = (user) => usersRepo.create(user);

/**
 * Returns updated user
 * @param {object} user 
 * @returns {object} an updated user
 */
const update = (user) => usersRepo.update(user);

/**
 * Deletes user by id
 * @param {string} id 
 * @returns void
 */
const remove = async (id) => {
  usersRepo.remove(id);
  tasksService.tasks.forEach(item => {
    if (item.userId === id) {
      const task = {...item, userId: null};
      tasksService.update(task);  
    }    
  });
};

module.exports = { getAll, getById, create, update, remove };
