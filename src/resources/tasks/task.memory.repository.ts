import Task from './task.model';

const tasks: Task[] = [];

/**
 * Returns all tasks
 * @returns {Object[]} Array of tasks
 */
const getAll = async (): Promise<Task[]> => tasks;

/**
 * Returns task by id
 * @param {string} id
 * @returns {Object} a required task
 */
const getById = async (id:string): Promise<Task | undefined> => tasks.find((task: Task) => task.id === id);

/**
 * Creates new task
 * @param {Object} task
 * @returns void
 */
const create = async (task: Task): Promise<void> => {
  tasks.push(task);
}

/**
 * Returns updated task
 * @param {Object} task
 * @returns {Object} an updated task
 */
const update = async (task: Task): Promise<Task> => {
  const index = tasks.findIndex((item: Task) => task.id === item.id);
  tasks[index] = task;
  return task;
};

/**
 * Deletes task by id
 * @param {string} id
 * @returns void
 */
const remove = async (id: string | undefined): Promise<void> => {
  const index = tasks.findIndex((item: Task) => id === item.id);
  tasks.splice(index, 1);
};

export default {
  getAll, getById, create, update, remove, tasks,
};
