import type { Task } from '@monorepo/shared';

let tasks: Task[] = [
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
  {
    id: '3',
    title: 'Add authentication',
    description: 'Implement user login',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date('2024-01-03').toISOString(),
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

export function getAllTasks(): Task[] {
  return tasks;
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find((task) => task.id === id);
}

export function createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Task {
  const newTask: Task = {
    ...taskData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
}

export function updateTask(id: string, updates: Partial<Task>): Task | null {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return null;

  tasks[index] = { ...tasks[index], ...updates };
  return tasks[index];
}

export function deleteTask(id: string): boolean {
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  return tasks.length < initialLength;
}
