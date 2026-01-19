import type { ITaskService } from './ITaskService.ts';
import type { Task } from '../types';

export class TaskServiceMock implements ITaskService {
  private delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  private tasks: Task[] = [
    {
      id: '1',
      title: 'Set up project structure',
      description: 'Create folders and configure TypeScript',
      status: 'done',
      priority: 'high',
      createdAt: new Date(2025, 11, 1).toISOString(),
    },
    {
      id: '2',
      title: 'Build task manager',
      description: 'Create CRUD operations for tasks',
      status: 'done',
      priority: 'high',
      createdAt: new Date(2025, 11, 5).toISOString(),
    },
    {
      id: '3',
      title: 'Add authentication',
      description: 'Implement user login and JWT token handling',
      status: 'in-progress',
      priority: 'high',
      createdAt: new Date(2026, 0, 2).toISOString(),
      dueDate: new Date(2026, 0, 25).toISOString(),
    },
    {
      id: '4',
      title: 'Design database schema',
      description: 'Create Entity Framework models and migrations',
      status: 'in-progress',
      priority: 'high',
      createdAt: new Date(2026, 0, 3).toISOString(),
      dueDate: new Date(2026, 0, 20).toISOString(),
    },
    {
      id: '5',
      title: 'Implement user profile page',
      description:
        'Add page for users to view and edit their profile information',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date(2026, 0, 5).toISOString(),
      dueDate: new Date(2026, 0, 30).toISOString(),
    },
  ];

  async getTasks(): Promise<Task[]> {
    await this.delay(500);
    return [...this.tasks];
  }

  async getTask(id: string): Promise<Task | undefined> {
    await this.delay(300);
    return this.tasks.find((task) => task.id === id);
  }

  async createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    await this.delay(500);
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    await this.delay(500);
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }

    this.tasks[index] = { ...this.tasks[index], ...updates };
    return this.tasks[index];
  }

  async deleteTask(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.tasks.findIndex((t) => t.id === id);
        if (index === -1) {
          reject(new Error('Task not found'));
          return;
        }
        this.tasks.splice(index, 1);
        resolve();
      }, 100);
    });
  }
}
