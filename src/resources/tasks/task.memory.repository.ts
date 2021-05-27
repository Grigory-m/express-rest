import Task from "../tasks/task.model";
const tasks: Task[] = [];

/**
 * Returns all tasks
 * @returns {array} Array of tasks
 */
const getAll = async () => tasks;

/**
 * Returns task by id
 * @param {string} id 
 * @returns {object} a required task
 */
const getById = async (id:string) => tasks.find((task: Task) => task.id === id);

/**
 * Creates new task
 * @param {object} task 
 * @returns void
 */
const create = async (task: Task) => tasks.push(task);

/**
 * Returns updated task
 * @param {object} task 
 * @returns {object} an updated task
 */
const update = async (task: Task) => {
  const index = tasks.findIndex((item: Task) => task.id === item.id);
  tasks[index] = task;
  return task;
};

/**
 * Deletes task by id
 * @param {string} id 
 * @returns void
 */
const remove = async (id: string) => {
  const index = tasks.findIndex((item: Task) => id === item.id);
  tasks.splice(index, 1);
};

export default { getAll, getById, create, update, remove, tasks };
