import type { Task } from '../../types';
import { formatDate, getRelativeTime } from '../../utils/date';
import styles from './TaskCard.module.css';
import { classNames } from '../../utils/classNames';

type TaskCardProps = {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
};

function TaskCard({ task, onDelete, onStatusChange }: TaskCardProps) {
  const priorityClass = classNames(
    styles.priority,
    task.priority === 'low' && styles.priorityLow,
    task.priority === 'medium' && styles.priorityMedium,
    task.priority === 'high' && styles.priorityHigh
  );

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{task.title}</h3>
      <span className={priorityClass}>{task.priority} priority</span>

      <p className={styles.description}>{task.description}</p>

      <div className={styles.meta}>
        <span>📅 {getRelativeTime(task.createdAt)}</span>
        {task.dueDate && <span>⏰ Due {formatDate(task.dueDate)}</span>}
      </div>

      <div className={styles.actions}>
        <select
          className={styles.statusSelect}
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          className={styles.deleteButton}
          onClick={() => {
            if (confirm('Delete this task?')) {
              onDelete(task.id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;