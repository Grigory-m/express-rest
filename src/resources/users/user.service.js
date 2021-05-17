const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const create = (user) => usersRepo.create(user);
const update = (user) => usersRepo.update(user);
const remove = async (id) => {
  const tasks = await tasksService.getAll();
  tasks.forEach(item => {
    const task = item;
    if (task.userId === id) {
      task.userId = null;
      tasksService.update(task);  
      console.log(task) 
    }         
    return task;
  });

  return usersRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
