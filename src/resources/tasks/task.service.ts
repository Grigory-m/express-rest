import { getRepository } from 'typeorm';
import { Task } from '../../entities/Task';
import tasksRepo from './task.memory.repository';
/**
 * Returns tasks by boardId
 * @param {string} boardId
 * @returns {Object[]} array of tasks
 */
const getAll = async (boardId: string | undefined): Promise<Task[]> => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({ boardId });
  return tasks;
}

/**
 * Returns tasks by boardId and task id
 * @param {string} boardId
 * @param {string} id
 * @returns {Object} tasks with boardId and task id
 */
const getById = async (boardId: string | undefined, id: string |undefined): Promise<Task | undefined> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne({ boardId, id });
  return task;
}

/**
 * Returns task with userId
 * @param {string} userId
 * @returns {Object} task with userId
 */
const getByUserId = async (userId: string): Promise<Task[] | undefined> => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({ userId });
  return tasks;
}

/**
 * Creates new task
 * @param {string} boardId
 * @param {Object} task
 * @returns {Object} new task
 */
const create = async (task: Task): Promise<void> => {
  await tasksRepo.create(task);
}

/**
 * Update task
 * @param {Object} task
 * @returns {Object} an updated task
 */
const update = async (task: Task): Promise<Task | undefined> => {
  const updatedTask = tasksRepo.update(task);
  return updatedTask;
};

/**
 * Remove task by id and boardId
 * @param {string} boardId
 * @param {string} id
 * @returns void
 */
const remove = async (id: string | undefined): Promise<void> => {
  await tasksRepo.remove(id);
};

export default {
  getAll, getById, getByUserId, create, update, remove,
};
