import { updateTask } from '../../utils/taskStore';
import type { UpdateTaskInput } from '@monorepo/shared';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Task ID is required',
    });
  }

  const body = await readBody<UpdateTaskInput>(event);
  const updatedTask = updateTask(id, body);

  if (!updatedTask) {
    throw createError({
      statusCode: 404,
      message: 'Task not found',
    });
  }

  return updatedTask;
});
