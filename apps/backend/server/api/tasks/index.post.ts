import { createTask } from '../../utils/taskStore';
import type { CreateTaskInput } from '@monorepo/shared';

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateTaskInput>(event);

  if (!body.title || !body.description || !body.status || !body.priority) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields',
    });
  }

  const newTask = createTask(body);
  return newTask;
});
