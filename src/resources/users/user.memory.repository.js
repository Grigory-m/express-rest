const users = [];

/**
 * Returns all users
 * @returns {array} Array of users
 */
const getAll = async () => users;

/**
 * Returns user by id
 * @param {string} id 
 * @returns {object} a required user
 */
const getById = async (id) => users.find(user => user.id === id);

/**
 * Creates new user
 * @param {object} user 
 * @returns void
 */
const create = async (user) => {  
  users.push(user);
};

/**
 * Returns updated user
 * @param {object} user 
 * @returns {object} an updated user
 */
const update = async (user) => {
  const index = users.findIndex(item => user.id === item.id);
  users[index] = user;
  return user;
};

/**
 * Deletes user by id
 * @param {string} id 
 * @returns void
 */
const remove = async (id) => {
  const index = users.findIndex(item => id === item.id);
  users.splice(index, 1);
};

module.exports = { getAll, getById, create, update, remove };
