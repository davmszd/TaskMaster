import type { Task } from '../../types';
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
  onStatusChange?: (id: string, status: Task['status']) => void;
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
    priority: string
  ):
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning' => {
    switch (priority) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusColor = (
    status: string
  ):
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning' => {
    switch (status) {
      case 'todo':
        return 'default';
      case 'in-progress':
        return 'info';
      case 'done':
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
        opacity: task.status === 'done' ? 0.7 : 1,
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
            label={task.priority}
            color={getPriorityColor(task.priority)}
            size="small"
          />
          <Chip
            label={
              task.status === 'in-progress'
                ? 'In Progress'
                : task.status.toUpperCase()
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
              onChange={(e) =>
                onStatusChange(task.id, e.target.value as Task['status'])
              }
              sx={{ minWidth: 120 }}
              aria-label="Change task status"
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
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
