import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskList from './TaskList';
import { tasksApi } from '../../api/TaskServiceFactory.ts';
import type { Task } from '../../types';

vi.mock('../../api/tasks', () => ({
  tasksApi: {
    getTasks: vi.fn(),
    deleteTask: vi.fn(),
    updateTask: vi.fn(),
  },
}));

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    status: 'todo',
    priority: 'high',
    createdAt: new Date('2024-01-01').toISOString(),
    dueDate: new Date('2024-12-31').toISOString(),
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Description 2',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date('2024-01-02').toISOString(),
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'Description 3',
    status: 'done',
    priority: 'low',
    createdAt: new Date('2024-01-03').toISOString(),
  },
];

describe('TaskList', () => {
  const mockSetTasks = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn(() => true);
    window.alert = vi.fn();
  });

  describe('Loading state', () => {
    it('displays loading state initially', () => {
      vi.mocked(tasksApi.getTasks).mockImplementation(
        () => new Promise(() => {})
      );

      render(<TaskList tasks={[]} setTasks={mockSetTasks} />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('loads tasks on mount', async () => {
      vi.mocked(tasksApi.getTasks).mockResolvedValue(mockTasks);

      render(<TaskList tasks={[]} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(tasksApi.getTasks).toHaveBeenCalledTimes(1);
        expect(mockSetTasks).toHaveBeenCalledWith(mockTasks);
      });
    });
  });

  describe('Error handling', () => {
    it('displays error message when loading fails', async () => {
      const errorMessage = 'Network error';
      vi.mocked(tasksApi.getTasks).mockRejectedValue(new Error(errorMessage));

      render(<TaskList tasks={[]} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
      });
    });

    it('handles non-Error objects in catch', async () => {
      vi.mocked(tasksApi.getTasks).mockRejectedValue('String error');

      render(<TaskList tasks={[]} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(
          screen.getByText('Error: Failed to load tasks')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Task filtering', () => {
    beforeEach(() => {
      vi.mocked(tasksApi.getTasks).mockResolvedValue([]);
    });

    it('displays all tasks by default', async () => {
      render(<TaskList tasks={mockTasks} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
      expect(screen.getByText('Task 3')).toBeInTheDocument();
    });

    it('filters tasks by todo status', async () => {
      render(<TaskList tasks={mockTasks} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      const todoButton = screen.getByRole('button', { name: /To Do/i });
      fireEvent.click(todoButton);

      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Task 3')).not.toBeInTheDocument();
    });

    it('filters tasks by in-progress status', async () => {
      render(<TaskList tasks={mockTasks} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      const inProgressButton = screen.getByRole('button', {
        name: /In Progress/i,
      });
      fireEvent.click(inProgressButton);

      expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
      expect(screen.queryByText('Task 3')).not.toBeInTheDocument();
    });

    it('filters tasks by done status', async () => {
      render(<TaskList tasks={mockTasks} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      const doneButton = screen.getByRole('button', { name: /Done/i });
      fireEvent.click(doneButton);

      expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
      expect(screen.getByText('Task 3')).toBeInTheDocument();
    });

    it('displays task counts for each filter', async () => {
      render(<TaskList tasks={mockTasks} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      expect(screen.getByText(/All \(3\)/)).toBeInTheDocument();
      expect(screen.getByText(/To Do \(1\)/)).toBeInTheDocument();
      expect(screen.getByText(/In Progress \(1\)/)).toBeInTheDocument();
      expect(screen.getByText(/Done \(1\)/)).toBeInTheDocument();
    });
  });

  describe('View mode toggle', () => {
    beforeEach(() => {
      vi.mocked(tasksApi.getTasks).mockResolvedValue([]);
    });

    it('displays card view by default', async () => {
      render(<TaskList tasks={mockTasks} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      const cardButton = screen.getByRole('button', { name: /card view/i });
      expect(cardButton).toHaveClass('Mui-selected');
    });

    it('switches to list view when button is clicked', async () => {
      render(<TaskList tasks={mockTasks} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      const listButton = screen.getByRole('button', { name: /list view/i });
      fireEvent.click(listButton);

      expect(listButton).toHaveClass('Mui-selected');
    });

    it('switches to card view from list view', async () => {
      render(<TaskList tasks={mockTasks} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      const listButton = screen.getByRole('button', { name: /list view/i });
      const cardButton = screen.getByRole('button', { name: /card view/i });

      fireEvent.click(listButton);
      expect(listButton).toHaveClass('Mui-selected');

      fireEvent.click(cardButton);
      expect(cardButton).toHaveClass('Mui-selected');
    });
  });

  describe('Empty state', () => {
    beforeEach(() => {
      vi.mocked(tasksApi.getTasks).mockResolvedValue([]);
    });

    it('displays empty state when no tasks exist', async () => {
      render(<TaskList tasks={[]} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      expect(screen.getByText('No tasks found')).toBeInTheDocument();
      expect(
        screen.getByText('Create your first task to get started!')
      ).toBeInTheDocument();
    });

    it('displays empty state when filter returns no results', async () => {
      const todoTasks: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Description 1',
          status: 'todo',
          priority: 'high',
          createdAt: new Date().toISOString(),
        },
      ];
      render(<TaskList tasks={todoTasks} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      const doneButton = screen.getByRole('button', { name: /Done/i });
      fireEvent.click(doneButton);

      expect(screen.getByText('No tasks found')).toBeInTheDocument();
    });
  });

  describe('Task deletion', () => {
    beforeEach(() => {
      vi.mocked(tasksApi.getTasks).mockResolvedValue([]);
      vi.mocked(tasksApi.deleteTask).mockResolvedValue(undefined);
    });

    it('deletes a task successfully', async () => {
      render(<TaskList tasks={mockTasks} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      const deleteButtons = screen.getAllByLabelText('Delete task');
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(tasksApi.deleteTask).toHaveBeenCalledWith('1');
        expect(mockSetTasks).toHaveBeenCalledWith(expect.any(Function));
      });

      const updaterFunction = mockSetTasks.mock.calls[1][0];
      const result = updaterFunction(mockTasks);
      expect(result).toHaveLength(2);
      expect(result.find((t: Task) => t.id === '1')).toBeUndefined();
    });

    it('displays alert when deletion fails', async () => {
      const errorMessage = 'Delete failed';
      vi.mocked(tasksApi.deleteTask).mockRejectedValue(new Error(errorMessage));
      render(<TaskList tasks={mockTasks} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      const deleteButtons = screen.getAllByLabelText('Delete task');
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith(
          expect.stringContaining('Failed to delete task')
        );
      });
    });
  });

  describe('Task status change', () => {
    beforeEach(() => {
      vi.mocked(tasksApi.getTasks).mockResolvedValue([]);
      vi.mocked(tasksApi.updateTask).mockResolvedValue({} as Task);
    });

    it('updates task status successfully', async () => {
      render(<TaskList tasks={mockTasks} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      const statusSelects = screen.getAllByRole('combobox');
      fireEvent.mouseDown(statusSelects[0]);
      const doneOption = await screen.findByRole('option', { name: 'Done' });
      fireEvent.click(doneOption);

      await waitFor(() => {
        expect(tasksApi.updateTask).toHaveBeenCalledWith('1', {
          status: 'done',
        });
        expect(mockSetTasks).toHaveBeenCalledWith(expect.any(Function));
      });

      const updaterFunction = mockSetTasks.mock.calls[1][0];
      const result = updaterFunction(mockTasks);
      const updatedTask = result.find((t: Task) => t.id === '1');
      expect(updatedTask?.status).toBe('done');
    });

    it('displays alert when status update fails', async () => {
      const errorMessage = 'Update failed';
      vi.mocked(tasksApi.updateTask).mockRejectedValue(new Error(errorMessage));
      render(<TaskList tasks={mockTasks} setTasks={mockSetTasks} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      const statusSelects = screen.getAllByRole('combobox');
      fireEvent.mouseDown(statusSelects[0]);
      const doneOption = await screen.findByRole('option', { name: 'Done' });
      fireEvent.click(doneOption);

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith(
          expect.stringContaining('Failed to update task')
        );
      });
    });
  });

  describe('Task editing', () => {
    beforeEach(() => {
      vi.mocked(tasksApi.getTasks).mockResolvedValue([]);
    });

    it('calls onEditTask when edit button is clicked', async () => {
      const mockEditTask = vi.fn();
      render(
        <TaskList
          tasks={mockTasks}
          setTasks={mockSetTasks}
          onEditTask={mockEditTask}
        />
      );

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      const editButtons = screen.getAllByLabelText('Edit task');
      fireEvent.click(editButtons[0]);

      expect(mockEditTask).toHaveBeenCalledWith('1');
    });
  });
});
