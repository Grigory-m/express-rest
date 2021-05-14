const { readData, writeData } = require('../../utils/data');

const filePath = `${__dirname}\\boards.json`;

const getAll = async () => {
  const boards = await readData(filePath);
  return boards;
};

const getById = async (id) => {
  const boards = await readData(filePath);
  const boardById = boards.find(board => board.id === id);
  return boardById;
};

const create = async (board) => {  
  const boards = await readData(filePath);  
  boards.push(board);
  await writeData(boards, filePath);  
};

const update = async (board) => {
  const boards = await readData(filePath);
  const index = boards.findIndex(item => board.id === item.id);
  boards[index] = board;
  await writeData(boards, filePath);
  return board;
};

const remove = async (id) => {
  const boards = await readData(filePath);
  const index = boards.findIndex(item => id === item.id);
  boards.splice(index, 1);
  await writeData(boards, filePath);   
};

module.exports = { getAll, getById, create, update, remove };
