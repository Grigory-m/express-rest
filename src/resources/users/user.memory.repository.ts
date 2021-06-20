import { getRepository } from 'typeorm';
import { User } from '../../entities/User';

/**
 * Returns all users
 * @returns {Object[]} Array of users
 */
const getAll = async (): Promise<User[]> => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  return users;
};

/**
 * Returns user by id
 * @param {string} id
 * @returns {Object} a required user
 */
const getById = async (id: string | undefined): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  return user;
}

/**
 * Creates new user
 * @param {Object} user
 * @returns void
 */
const create = async (user: User): Promise<User> => {
  const userRepository = getRepository(User);
  const newUser = new User();
  const { name, login, password } = user;
  newUser.name =name;
  newUser.login = login;
  newUser.password = password;
  await userRepository.save(newUser);
  return newUser;  
}

/**
 * Returns updated user
 * @param {Object} user
 * @returns {Object} an updated user
 */
const update = async (user: User): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  const updatedUser = await userRepository.findOne(user.id);
  if (updatedUser) {
    const { name, login, password } = user;
    updatedUser.name =name;
    updatedUser.login = login;
    updatedUser.password = password;
    await userRepository.save(updatedUser);
  }  
  return updatedUser;
};

/**
 * Deletes user by id
 * @param {string} id
 * @returns void
 */
const remove = async (id: string | undefined): Promise<void> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  if (user) {
    await userRepository.remove(user);
  }  
};

export default {
  getAll, getById, create, update, remove
};
