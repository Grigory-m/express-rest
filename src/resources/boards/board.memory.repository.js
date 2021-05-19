const boards = [];

const getAll = async () => boards;

const getById = async (id) => {
  return boards.find(board => board.id === id);;
};

const create = async (board) => {  
  boards.push(board);
};

const update = async (board) => {
  const index = boards.findIndex(item => board.id === item.id);
  boards[index] = board;
  return board;
};

const remove = async (id) => {
  const index = boards.findIndex(item => id === item.id);
  boards.splice(index, 1);
};

module.exports = { getAll, getById, create, update, remove };
