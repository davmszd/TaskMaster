import type { ITaskService } from './ITaskService.ts';
import type { Task } from '../types';

export class TaskService implements ITaskService {
  private readonly apiBaseUrl: string;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${this.apiBaseUrl}/api/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return await response.json();
  }

  async getTask(id: string): Promise<Task | undefined> {
    const response = await fetch(`${this.apiBaseUrl}/api/tasks/${id}`);
    if (!response.ok) {
      if (response.status === 404) return undefined;
      throw new Error('Failed to fetch task');
    }
    return await response.json();
  }

  async createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    const response = await fetch(`${this.apiBaseUrl}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return await response.json();
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const response = await fetch(`${this.apiBaseUrl}/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return await response.json();
  }

  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${this.apiBaseUrl}/api/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  }
}
