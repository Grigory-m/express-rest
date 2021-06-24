import { getRepository } from 'typeorm';
import { User } from '../../entities/User';
import { Task } from '../../entities/Task';
import usersRepo from './user.memory.repository';

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
const create = async (user: User): Promise<User> => usersRepo.create(user);

/**
 * Returns updated user
 * @param {Object} user
 * @returns {Object} an updated user
 */
const update = async (user: User): Promise<User | undefined> => usersRepo.update(user);

/**
 * Deletes user by id
 * @param {string} id
 * @returns void
 */
const remove = async (id: string | undefined): Promise<User | undefined> => {
  const user = await usersRepo.remove(id);
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({ userId: id });
  await Promise.all(tasks.map(async task => {
    const updatedTask = task;
    updatedTask.userId = null;
    const promise = await taskRepository.save(task);
    return promise;
  }));   
  return user;
};

export default {
  getAll, getById, create, update, remove
};
