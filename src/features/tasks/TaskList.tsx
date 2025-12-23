import { useState, useEffect } from 'react';
import { tasksApi } from '../../api/tasks';
import type { Task } from '../../types';
import TaskCard from './TaskCard';
import StyledButton from '../../components/StyledButton';
import styles from './TaskList.module.css';

type FilterStatus = 'all' | Task['status'];

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await tasksApi.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await tasksApi.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  const handleStatusChange = async (id: string, status: Task['status']) => {
    try {
      await tasksApi.updateTask(id, { status });
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, status } : task))
      );
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const filteredTasks =
    filter === 'all' ? tasks : tasks.filter((task) => task.status === filter);

  if (isLoading) {
    return <div className={styles.loading}>Loading tasks...</div>;
  }

  if (error) {
    return <div style={{ color: '#c00' }}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>My Tasks</h2>
        <StyledButton onClick={() => alert('Add task')}>+ New Task</StyledButton>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({tasks.length})
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'todo' ? styles.active : ''}`}
          onClick={() => setFilter('todo')}
        >
          To Do ({tasks.filter((t) => t.status === 'todo').length})
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'in-progress' ? styles.active : ''}`}
          onClick={() => setFilter('in-progress')}
        >
          In Progress ({tasks.filter((t) => t.status === 'in-progress').length})
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'done' ? styles.active : ''}`}
          onClick={() => setFilter('done')}
        >
          Done ({tasks.filter((t) => t.status === 'done').length})
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No tasks found</h3>
          <p>Create your first task to get started!</p>
        </div>
      ) : (
        <div className={styles.taskGrid}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;