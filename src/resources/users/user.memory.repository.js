const { readData, writeData} = require('../../utils/data');

const filePath = `${__dirname}\\users.json`;

const getAll = async () => {
  const users = await readData(filePath);
  return users;
};

const getById = async (id) => {
  const users = await readData(filePath);
  return users.find(user => user.id === id);
};

const create = async (user) => {  
  const users = await readData(filePath);  
  users.push(user);
  await writeData(users, filePath);  
};

const update = async (user) => {
  const users = await readData(filePath);
  const index = users.findIndex(item => user.id === item.id);
  users[index] = user;
  await writeData(users, filePath);
  return user;
};

const remove = async (id) => {
  const users = await readData(filePath);
  const index = users.findIndex(item => id === item.id);
  users.splice(index, 1);
  await writeData(users, filePath);  
};

module.exports = { getAll, getById, create, update, remove };
