import User from './user.model';
import Task from '../tasks/task.model';
import usersRepo from './user.memory.repository';
import tasksService from '../tasks/task.memory.repository';

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
const getById = (id: string | undefined) => usersRepo.getById(id);

/**
 * Creates new user
 * @param {object} user 
 * @returns void
 */
const create = (user: User) => usersRepo.create(user);

/**
 * Returns updated user
 * @param {object} user 
 * @returns {object} an updated user
 */
const update = (user: User): object => usersRepo.update(user);

/**
 * Deletes user by id
 * @param {string} id 
 * @returns void
 */
const remove = async (id: string | undefined) => {
  usersRepo.remove(id);
  tasksService.tasks.forEach((item: Task) => {
    if (item.userId === id) {
      const task = {...item, userId: null};
      tasksService.update(task);  
    }    
  });
};

export default { getAll, getById, create, update, remove };
