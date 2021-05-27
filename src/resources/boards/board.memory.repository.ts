import Board from "./board.model";
const boards: Board[] = [];

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
const getById = async (id: string | undefined) => boards.find(board => board.id === id);

/**
 * Creates new board
 * @param {object} board 
 * @returns void
 */
const create = async (board: Board) => boards.push(board);

/**
 * Returns updated board
 * @param {object} board 
 * @returns {object} an updated board
 */
const update = async (board: Board) => {
  const index = boards.findIndex((item: Board) => board.id === item.id);
  boards[index] = board;
  return board;
};

/**
 * Deletes board by id
 * @param {string} id 
 * @returns void
 */
const remove = async (id: string | undefined) => {
  const index = boards.findIndex((item: Board) => id === item.id);
  boards.splice(index, 1);
};

export default { getAll, getById, create, update, remove };
