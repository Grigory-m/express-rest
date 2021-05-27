import Task from "../tasks/task.model";
const tasksRepo = require('./task.memory.repository');
const { tasks } = tasksRepo;
/**
 * Returns tasks by boardId
 * @param {string} boardId 
 * @returns {array} array of tasks
 */
const getAll = async (boardId: string | undefined) => tasks.filter((task: Task) => task.boardId === boardId);

/**
 * Returns tasks by boardId and task id
 * @param {string} boardId 
 * @param {string} id 
 * @returns {object} tasks with boardId and task id
 */
const getById = async (boardId: string | undefined, id: string |undefined) => {
  const tasksWithBoardId = tasks.filter((task: Task) => task.boardId === boardId);
  return tasksWithBoardId.find((task: Task) => task.id === id);
};

/**
 * Returns task with userId
 * @param {string} userId 
 * @returns {object} task with userId
 */
const getByUserId = async (userId: string) => tasksRepo.tasks.find(((task: Task) => task.userId === userId));

/**
 * Creates new task
 * @param {string} boardId 
 * @param {object} task 
 * @returns {object} new task
 */
const create = async (boardId: string | undefined, task: Task) => {
  const newTask = await tasksRepo.create({...task, boardId: boardId});
  return newTask;
};

/**
 * Update task
 * @param {object} task 
 * @returns {object} an updated task
 */
const update = async (task: Task) => {
  const updatedTask = await tasksRepo.update(task);
  return updatedTask;
};

/**
 * Remove task by id and boardId
 * @param {string} boardId 
 * @param {string} id 
 * @returns void
 */
const remove = async (id: string | undefined) => {
  await tasksRepo.remove(id);
};

export default { getAll, getById, getByUserId, create, update, remove };
