import type { Task } from '../types';

export interface ITaskService {
  getTasks(): Promise<Task[]>;

  getTask(id: string): Promise<Task | undefined>;

  createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task>;

  updateTask(id: string, updates: Partial<Task>): Promise<Task>;

  deleteTask(id: string): Promise<void>;
}
