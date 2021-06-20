import { Board } from '../../entities/Board';
import boardsRepo from './board.memory.repository';
import tasksService from '../tasks/task.service';

/**
 * Returns all boards
 * @returns {Object[]} Array of boards
 */
const getAll = (): Promise<Board[]> => boardsRepo.getAll();

/**
 * Returns board by id
 * @param {string} id
 * @returns {Object} a required board
 */
const getById = (id: string | undefined): Promise<Board | undefined> => boardsRepo.getById(id);

/**
 * Creates new board
 * @param {Object} board
 * @returns void
 */
const create = (board: Board): Promise<Board> => boardsRepo.create(board);

/**
 * Returns updated board
 * @param {Object} board
 * @returns {Object} an updated board
 */
const update = (board: Board): Promise<Board | undefined> => boardsRepo.update(board);

/**
 * Deletes board by id
 * @param {string} id
 * @returns void
 */
const remove = async (id: string | undefined): Promise<void> => {
  await tasksService.remove(id);
  boardsRepo.remove(id);
};

export default {
  getAll, getById, create, update, remove,
};
