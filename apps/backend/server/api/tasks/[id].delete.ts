import { deleteTask } from '../../utils/taskStore';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Task ID is required',
    });
  }

  const success = deleteTask(id);

  if (!success) {
    throw createError({
      statusCode: 404,
      message: 'Task not found',
    });
  }

  return { success: true, message: 'Task deleted successfully' };
});
