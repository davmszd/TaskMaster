import { getAllTasks } from '../../utils/taskStore';

export default defineEventHandler(async () => {
  const tasks = getAllTasks();
  return tasks;
});
