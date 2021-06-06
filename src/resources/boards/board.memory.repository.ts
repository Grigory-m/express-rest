import Board from './board.model';

const boards: Board[] = [];

/**
 * Returns all boards
 * @returns {Object[]} Array of boards
 */
const getAll = async (): Promise<Board[]> => boards;

/**
 * Returns board by id
 * @param {string} id
 * @returns {Object} a required board
 */
const getById = async (id: string | undefined): Promise<Board | undefined> => boards.find((board) => board.id === id);

/**
 * Creates new board
 * @param {Object} board
 * @returns void
 */
const create = async (board: Board): Promise<number> => boards.push(board);

/**
 * Returns updated board
 * @param {Object} board
 * @returns {Object} an updated board
 */
const update = async (board: Board): Promise<Board> => {
  const index = boards.findIndex((item: Board) => board.id === item.id);
  boards[index] = board;
  return board;
};

/**
 * Deletes board by id
 * @param {string} id
 * @returns void
 */
const remove = async (id: string | undefined): Promise<void> => {
  const index = boards.findIndex((item: Board) => id === item.id);
  boards.splice(index, 1);
};

export default {
  getAll, getById, create, update, remove,
};
