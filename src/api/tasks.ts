import type { Task } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let mockTasks: Task[] = [
  {
    id: '1',
    title: 'Set up project structure',
    description: 'Create folders and configure TypeScript',
    status: 'done',
    priority: 'high',
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '2',
    title: 'Build task manager',
    description: 'Create CRUD operations for tasks',
    status: 'in-progress',
    priority: 'high',
    createdAt: new Date('2024-01-02').toISOString(),
  },
  {
    id: '3',
    title: 'Add authentication',
    description: 'Implement user login',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date('2024-01-03').toISOString(),
  },
];

export const tasksApi = {
  async getTasks(): Promise<Task[]> {
    await delay(500);
    return [...mockTasks];
  },

  async getTask(id: string): Promise<Task | undefined> {
    await delay(300);
    return mockTasks.find((task) => task.id === id);
  },

  async createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    await delay(500);
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    mockTasks.push(newTask);
    return newTask;
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    await delay(500);
    const index = mockTasks.findIndex((task) => task.id === id);
    if (index === -1) throw new Error('Task not found');

    mockTasks[index] = { ...mockTasks[index], ...updates };
    return mockTasks[index];
  },

  async deleteTask(id: string): Promise<void> {
    await delay(500);
    mockTasks = mockTasks.filter((task) => task.id !== id);
  },
};
