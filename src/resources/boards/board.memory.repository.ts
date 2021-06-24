import { getRepository } from 'typeorm';
import { Board } from '../../entities/Board';

/**
 * Returns all boards
 * @returns {Object[]} Array of boards
 */
const getAll = async (): Promise<Board[]> => {
  const boardRepository = getRepository(Board);
  const boards = await boardRepository.find();
  return boards;
};

/**
 * Returns board by id
 * @param {string} id
 * @returns {Object} a required board
 */
const getById = async (id: string | undefined): Promise<Board | undefined> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(id);
  return board;
}

/**
 * Creates new board
 * @param {Object} board
 * @returns void
 */
const create = async (board: Board): Promise<Board> => {
  const boardRepository = getRepository(Board);
  const newBoard = await boardRepository.save(board);
  return newBoard;  
}

/**
 * Returns updated board
 * @param {Object} board
 * @returns {Object} an updated board
 */
const update = async (board: Board): Promise<Board | undefined> => {
  const boardRepository = getRepository(Board);
  const updatedBoard = await boardRepository.findOne(board.id);
  if (updatedBoard) {
    await boardRepository.save(board);
  }  
  return updatedBoard;
};

/**
 * Deletes board by id
 * @param {string} id
 * @returns void
 */
const remove = async (id: string | undefined): Promise<Board | undefined> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(id);
  if (board) {
    await boardRepository.remove(board);
  }  
  return board;
};

export default {
  getAll, getById, create, update, remove
};
