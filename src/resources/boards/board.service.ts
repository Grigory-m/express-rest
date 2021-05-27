import Board from "./board.model";
import Task from "../tasks/task.model";
import boardsRepo from './board.memory.repository';
import tasksService from '../tasks/task.service';

/**
 * Returns all boards
 * @returns {array} Array of boards
 */
const getAll = () => boardsRepo.getAll();

/**
 * Returns board by id
 * @param {string} id 
 * @returns {object} a required board
 */
const getById = (id: string | undefined) => boardsRepo.getById(id);

/**
 * Creates new board
 * @param {object} board 
 * @returns void
 */
const create = (board: Board) => boardsRepo.create(board);

/**
 * Returns updated board
 * @param {object} board 
 * @returns {object} an updated board
 */
const update = (board: Board) => boardsRepo.update(board);

/**
 * Deletes board by id
 * @param {string} id 
 * @returns void
 */
const remove = async (id: string | undefined) => {
  const tasks = await tasksService.getAll(id);
  const removedTasks = tasks.map((task: Task) => tasksService.remove(task.id));
  await Promise.all(removedTasks);
  boardsRepo.remove(id);
};

export default { getAll, getById, create, update, remove };
