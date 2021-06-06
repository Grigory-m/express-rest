import User from './user.model';
import Task from '../tasks/task.model';
import usersRepo from './user.memory.repository';
import tasksService from '../tasks/task.memory.repository';

/**
 * Returns all users
 * @returns {Object[]} Array of users
 */
const getAll = async (): Promise<User[]>  => usersRepo.getAll();

/**
 * Returns user by id
 * @param {string} id
 * @returns {Object} a required user
 */
const getById = async (id: string | undefined): Promise<User | undefined> => usersRepo.getById(id);

/**
 * Creates new user
 * @param {Object} user
 * @returns void
 */
const create = async (user: User): Promise<number> => usersRepo.create(user);

/**
 * Returns updated user
 * @param {Object} user
 * @returns {Object} an updated user
 */
const update = async (user: User): Promise<User> => usersRepo.update(user);

/**
 * Deletes user by id
 * @param {string} id
 * @returns void
 */
const remove = async (id: string | undefined): Promise<void> => {
  usersRepo.remove(id);
  tasksService.tasks.forEach((item: Task) => {
    if (item.userId === id) {
      const task = { ...item, userId: null };
      tasksService.update(task);
    }
  });
};

export default {
  getAll, getById, create, update, remove,
};
