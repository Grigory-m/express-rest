import { getRepository } from 'typeorm';
import { Task } from '../../entities/Task';

/**
 * Returns all tasks
 * @returns {Object[]} Array of tasks
 */
const getAll = async (): Promise<Task[]> => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find();
  return tasks;
};

/**
 * Returns task by id
 * @param {string} id
 * @returns {Object} a required task
 */
const getById = async (id:string): Promise<Task | undefined> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne(id);
  return task;
}

/**
 * Creates new task
 * @param {Object} task
 * @returns void
 */
const create = async (task: Task): Promise<Task> => {
  const taskRepository = getRepository(Task);
  await taskRepository.save(task);
  return task;  
}

/**
 * Returns updated task
 * @param {Object} task
 * @returns {Object} an updated task
 */
const update = async (task: Task): Promise<Task | undefined> => {
  const taskRepository = getRepository(Task);
  const updatedTask = await taskRepository.save(task);
  return updatedTask;
};


/**
 * Deletes task by id
 * @param {string} id
 * @returns void
 */
const remove = async (id: string | undefined, boardId: string): Promise<Task | undefined> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne({ id, boardId });
  if (task) {
    await taskRepository.remove(task);
  }  
  return task;
};

export default {
  getAll, getById, create, update, remove
};
