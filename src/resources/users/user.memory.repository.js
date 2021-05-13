const { readData, writeData} = require('../../utils/data');
const fileName = 'users.json';

const getAll = async () => {
  return await readData(fileName);
};

const getById = async (id) => {
  const users = await readData(fileName);
  return users.find(user => user.id === id);
};

const create = async (user) => {  
  const users = await readData(fileName);  
  users.push(user);
  await writeData(users, fileName);
  return user;
};

const update = async (user) => {
  const users = await readData(fileName);
  const index = users.findIndex(item => user.id === item.id);
  users[index] = user;
  await writeData(users, fileName);
  return user;
};

const remove = async (id) => {
  const users = await readData(fileName);
  const index = users.findIndex(item => user.id === item.id);
  users.splice(index, 1);
  await writeData(users, fileName);  
};

module.exports = { getAll, getById, create, update, remove };
