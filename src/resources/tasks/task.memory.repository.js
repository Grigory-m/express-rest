const { readData, writeData } = require('../../utils/data');

const filePath = `${__dirname}\\tasks.json`;

const getAll = async () => {
  const tasks = await readData(filePath);
  return tasks;
};

const getById = async (id) => {
  const tasks = await readData(filePath);
  const taskById = tasks.find(task => task.id === id);
  return taskById;
};

const create = async (task) => {  
  const tasks = await readData(filePath);  
  tasks.push(task);
  await writeData(tasks, filePath);  
};

const update = async (task) => {
  const tasks = await readData(filePath);
  const index = tasks.findIndex(item => task.id === item.id);
  tasks[index] = task;
  await writeData(tasks, filePath);
  return task;
};

const remove = async (id) => {
  const tasks = await readData(filePath);
  const index = tasks.findIndex(item => id === item.id);
  tasks.splice(index, 1);
  await writeData(tasks, filePath);   
};

module.exports = { getAll, getById, create, update, remove };
