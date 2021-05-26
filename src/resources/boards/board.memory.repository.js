const boards = [];

/**
 * Returns all boards
 * @returns {array} Array of boards
 */
const getAll = async () => boards;

/**
 * Returns board by id
 * @param {string} id  
 * @returns {object} a required board
 */
const getById = async (id) => boards.find(board => board.id === id);

/**
 * Creates new board
 * @param {object} board 
 * @returns void
 */
const create = async (board) => boards.push(board);

/**
 * Returns updated board
 * @param {object} board 
 * @returns {object} an updated board
 */
const update = async (board) => {
  const index = boards.findIndex(item => board.id === item.id);
  boards[index] = board;
  return board;
};

/**
 * Deletes board by id
 * @param {string} id 
 * @returns void
 */
const remove = async (id) => {
  const index = boards.findIndex(item => id === item.id);
  boards.splice(index, 1);
};

module.exports = { getAll, getById, create, update, remove };
