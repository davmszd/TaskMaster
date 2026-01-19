import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskCard from './TaskCard';
import type { Task } from '../../types';

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'This is a test task description',
  status: 'todo',
  priority: 'high',
  createdAt: new Date('2024-01-01').toISOString(),
  dueDate: new Date('2024-12-31').toISOString(),
};

describe('TaskCard', () => {
  it('renders task information correctly', () => {
    render(<TaskCard task={mockTask} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test task description')
    ).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const mockDelete = vi.fn();
    window.confirm = vi.fn(() => true);

    render(<TaskCard task={mockTask} onDelete={mockDelete} />);

    const deleteButton = screen.getByLabelText('Delete task');
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith('1');
  });

  it('calls onStatusChange when status is changed', async () => {
    const mockStatusChange = vi.fn();
    const user = userEvent.setup();
    render(<TaskCard task={mockTask} onStatusChange={mockStatusChange} />);

    const statusSelect = screen.getByRole('combobox');
    await user.click(statusSelect);
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Done' })).toBeInTheDocument();
    });
    const doneOption = screen.getByRole('option', { name: 'Done' });
    await user.click(doneOption);

    expect(mockStatusChange).toHaveBeenCalledWith('1', 'done');
  });

  it('calls onEdit when edit button is clicked', () => {
    const mockEdit = vi.fn();

    render(<TaskCard task={mockTask} onEdit={mockEdit} />);

    const editButton = screen.getByLabelText('Edit task');
    fireEvent.click(editButton);

    expect(mockEdit).toHaveBeenCalledWith('1');
  });

  it('hides actions when showActions is false', () => {
    render(
      <TaskCard
        task={mockTask}
        showActions={false}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />
    );

    expect(screen.queryByLabelText('Delete task')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Edit task')).not.toBeInTheDocument();
  });

  it('applies completed style when task is done', () => {
    const completedTask = { ...mockTask, status: 'done' as const };
    const { container } = render(<TaskCard task={completedTask} />);

    const card = container.querySelector(
      '[class*="MuiCard-root"]'
    ) as HTMLElement;
    const cardStyle = window.getComputedStyle(card);

    expect(card).toBeInTheDocument();
    expect(cardStyle.opacity).toBe('0.7');
  });

  it('renders without optional fields', () => {
    const minimalTask: Task = {
      id: '2',
      title: 'Minimal Task',
      description: '',
      status: 'todo',
      priority: 'low',
      createdAt: new Date().toISOString(),
    };

    render(<TaskCard task={minimalTask} />);

    expect(screen.getByText('Minimal Task')).toBeInTheDocument();
    expect(screen.queryByText('Due')).not.toBeInTheDocument();
  });

  it('renders dates correctly from ISO strings', () => {
    const taskWithDates: Task = {
      id: '3',
      title: 'Task with Dates',
      description: 'Testing date rendering',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date('2024-01-15').toISOString(),
      dueDate: new Date('2024-12-25').toISOString(),
    };

    render(<TaskCard task={taskWithDates} />);

    expect(screen.getByText('Task with Dates')).toBeInTheDocument();
    expect(screen.getByText(/Created/)).toBeInTheDocument();
    expect(screen.getByText(/Due/)).toBeInTheDocument();
    expect(screen.getByText(/Dec 25, 2024/)).toBeInTheDocument();
  });
});
