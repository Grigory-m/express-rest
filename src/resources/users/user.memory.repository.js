const users = [];

const getAll = async () => users;

const getById = async (id) => users.find(user => user.id === id);

const create = async (user) => {  
  users.push(user);
};

const update = async (user) => {
  const index = users.findIndex(item => user.id === item.id);
  users[index] = user;
  return user;
};

const remove = async (id) => {
  const index = users.findIndex(item => id === item.id);
  users.splice(index, 1);
};

module.exports = { getAll, getById, create, update, remove };
