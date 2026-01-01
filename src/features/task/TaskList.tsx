import { useState, useEffect } from 'react';
import { tasksApi } from '../../api/tasks';
import styles from './TaskList.module.css';
import type { Task } from '../../types';
import TaskCard from './TaskCard';

type FilterStatus = 'all' | Task['status'];
type ViewMode = 'list' | 'card';

type TaskListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

function TaskList({ tasks, setTasks }: TaskListProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('card');

  useEffect(() => {
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

    loadTasks();
  }, [setTasks]);

  const handleDelete = async (id: string) => {
    try {
      await tasksApi.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      alert(`Failed to delete task ${err}`);
    }
  };
  const handleStatusChange = async (id: string, status: Task['status']) => {
    try {
      await tasksApi.updateTask(id, { status });
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, status } : task))
      );
    } catch (err) {
      alert(`Failed to update task ${err}`);
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
        <div className={styles.headerActions}>
          <div className={styles.viewToggle}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="viewMode"
                value="list"
                checked={viewMode === 'list'}
                onChange={(e) => setViewMode(e.target.value as ViewMode)}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>📋 List</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="viewMode"
                value="card"
                checked={viewMode === 'card'}
                onChange={(e) => setViewMode(e.target.value as ViewMode)}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>🎴 Card</span>
            </label>
          </div>
        </div>
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
      </div>{' '}
      {filteredTasks.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No tasks found</h3>
          <p>Create your first task to get started!</p>
        </div>
      ) : viewMode === 'card' ? (
        <div className={styles.taskGrid}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onEdit={(id) => alert(`Edit task ${id}`)}
            />
          ))}
        </div>
      ) : (
        <div className={styles.taskList}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onEdit={(id) => alert(`Edit task ${id}`)}
              showActions={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
