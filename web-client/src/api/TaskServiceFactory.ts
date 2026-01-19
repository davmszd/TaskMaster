import { TaskServiceMock } from './TaskServiceMock';
import { TaskService } from './TaskService.ts';

function createTaskApi() {
  const isProduction = import.meta.env.PROD;
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  if (isProduction) {
    return new TaskServiceMock();
  } else {
    if (!apiBaseUrl) {
      throw new Error(
        'VITE_API_URL environment variable is not defined. Please check your .env file.'
      );
    }
    return new TaskService(apiBaseUrl);
  }
}

export const tasksApi = createTaskApi();
