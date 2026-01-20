import type { Task } from '../../types';
import { TaskStatus, TaskPriority, statusToString, priorityToString } from '../../types';
import { getRelativeTime, formatDate } from '../../utils/date';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  IconButton,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday,
  Schedule,
} from '@mui/icons-material';

type TaskCardProps = {
  task: Task;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: TaskStatus) => void;
  onEdit?: (id: string) => void;
  showActions?: boolean;
};

function TaskCard({
  task,
  onDelete,
  onStatusChange,
  onEdit,
  showActions = true,
}: TaskCardProps) {
  const getPriorityColor = (
    priority: TaskPriority
  ):
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning' => {
    switch (priority) {
      case TaskPriority.Low:
        return 'success';
      case TaskPriority.Medium:
        return 'warning';
      case TaskPriority.High:
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusColor = (
    status: TaskStatus
  ):
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning' => {
    switch (status) {
      case TaskStatus.Todo:
        return 'default';
      case TaskStatus.InProgress:
        return 'info';
      case TaskStatus.Done:
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        opacity: task.status === TaskStatus.Done ? 0.7 : 1,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1,
          }}
        >
          <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
            {task.title}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={priorityToString(task.priority).toUpperCase()}
            color={getPriorityColor(task.priority)}
            size="small"
          />
          <Chip
            label={
              task.status === TaskStatus.InProgress
                ? 'In Progress'
                : statusToString(task.status).toUpperCase()
            }
            color={getStatusColor(task.status)}
            size="small"
          />
        </Stack>

        {task.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {task.description}
          </Typography>
        )}

        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              Created {getRelativeTime(task.createdAt)}
            </Typography>
          </Box>
          {task.dueDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                Due {formatDate(task.dueDate)}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>

      {showActions && (
        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          {onStatusChange && (
            <Select
              size="small"
              value={task.status}
              onChange={(e) => {
                const value = Number(e.target.value) as TaskStatus;
                onStatusChange(task.id, value);
              }}
              sx={{ minWidth: 120 }}
              aria-label="Change task status"
            >
              <MenuItem value={TaskStatus.Todo}>To Do</MenuItem>
              <MenuItem value={TaskStatus.InProgress}>In Progress</MenuItem>
              <MenuItem value={TaskStatus.Done}>Done</MenuItem>
            </Select>
          )}

          <Box sx={{ display: 'flex', gap: 1 }}>
            {onEdit && (
              <IconButton
                color="primary"
                onClick={() => onEdit(task.id)}
                aria-label="Edit task"
                title="Edit task"
                size="small"
              >
                <EditIcon />
              </IconButton>
            )}

            {onDelete && (
              <IconButton
                color="error"
                onClick={() => {
                  if (confirm(`Delete "${task.title}"?`)) {
                    onDelete(task.id);
                  }
                }}
                aria-label="Delete task"
                title="Delete task"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        </CardActions>
      )}
    </Card>
  );
}

export default TaskCard;
