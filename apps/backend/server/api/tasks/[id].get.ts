import { getTaskById } from '../../utils/taskStore';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Task ID is required',
    });
  }

  const task = getTaskById(id);
  
  if (!task) {
    throw createError({
      statusCode: 404,
      message: 'Task not found',
    });
  }

  return task;
});
