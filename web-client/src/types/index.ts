export const enum TaskStatus {
  Todo = 0,
  InProgress = 1,
  Done = 2
}

export const enum TaskPriority {
  Low = 0,
  Medium = 1,
  High = 2
}

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  dueDate?: string;
};

export function statusToString(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.Todo:
      return 'todo';
    case TaskStatus.InProgress:
      return 'in-progress';
    case TaskStatus.Done:
      return 'done';
    default:
      return 'todo';
  }
}

export function statusFromString(status: string): TaskStatus {
  switch (status.toLowerCase()) {
    case 'todo':
      return TaskStatus.Todo;
    case 'in-progress':
    case 'inprogress':
      return TaskStatus.InProgress;
    case 'done':
      return TaskStatus.Done;
    default:
      return TaskStatus.Todo;
  }
}

export function priorityToString(priority: TaskPriority): string {
  switch (priority) {
    case TaskPriority.Low:
      return 'low';
    case TaskPriority.Medium:
      return 'medium';
    case TaskPriority.High:
      return 'high';
    default:
      return 'medium';
  }
}

export function priorityFromString(priority: string): TaskPriority {
  switch (priority.toLowerCase()) {
    case 'low':
      return TaskPriority.Low;
    case 'medium':
      return TaskPriority.Medium;
    case 'high':
      return TaskPriority.High;
    default:
      return TaskPriority.Medium;
  }
}
