const tasks = [];

const getAll = async () => tasks;

const getById = async (id) => {
  return tasks.find(task => task.id === id);;
};

const create = async (task) => {  
  tasks.push(task);
};

const update = async (task) => {
  const index = tasks.findIndex(item => task.id === item.id);
  tasks[index] = task;
  return task;
};

const remove = async (id) => {
  const index = tasks.findIndex(item => id === item.id);
  tasks.splice(index, 1);
};

module.exports = { getAll, getById, create, update, remove, tasks };
