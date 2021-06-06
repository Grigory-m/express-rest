import User from './user.model';

const users: User[] = [];

/**
 * Returns all users
 * @returns {Object[]} Array of users
 */
const getAll = async (): Promise<User[]> => users;

/**
 * Returns user by id
 * @param {string} id
 * @returns {Object} a required user
 */
const getById = async (id: string | undefined): Promise<User | undefined> => users.find((user) => user.id === id);

/**
 * Creates new user
 * @param {Object} user
 * @returns void
 */
const create = async (user: User): Promise<number> => users.push(user);

/**
 * Returns updated user
 * @param {Object} user
 * @returns {Object} an updated user
 */
const update = async (user: User): Promise<User> => {
  const index = users.findIndex((item) => user.id === item.id);
  users[index] = user;
  return user;
};

/**
 * Deletes user by id
 * @param {string} id
 * @returns void
 */
const remove = async (id: string | undefined): Promise<void> => {
  const index = users.findIndex((item) => id === item.id);
  users.splice(index, 1);
};

export default {
  getAll, getById, create, update, remove,
};
