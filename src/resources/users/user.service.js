const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = () => usersRepo.getById();
const create = (user) => usersRepo.create(user);
const update = () => usersRepo.update();
const remove = () => usersRepo.remove();

module.exports = { getAll, getById, create, update, remove };
