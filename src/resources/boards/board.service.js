const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getById(id);
const create = (board) => boardsRepo.create(board);
const update = (board) => boardsRepo.update(board);
const remove = (id) => boardsRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };
