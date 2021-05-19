const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const create = (user) => usersRepo.create(user);
const update = (user) => usersRepo.update(user);
const remove = async (id) => {
  usersRepo.remove(id);
  tasksService.tasks.forEach(item => {
    if (item.userId === id) {
      const task = {...item, userId: null};
      tasksService.update(task);  
    }    
  });
};

module.exports = { getAll, getById, create, update, remove };
