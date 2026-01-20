import { useState, useEffect } from 'react';
import { tasksApi } from '../../api/TaskServiceFactory.ts';
import type { Task } from '../../types';
import { TaskStatus } from '../../types';
import TaskCard from './TaskCard';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
} from '@mui/material';
import { ViewList, ViewModule } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useNotification } from '../../contexts/NotificationContext';

type FilterStatus = 'all' | TaskStatus;
type ViewMode = 'list' | 'card';

type TaskListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onEditTask?: (taskId: string) => void;
};

function TaskList({ tasks, setTasks, onEditTask }: TaskListProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const { showSuccess, showError } = useNotification();

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
      showSuccess(`Task deleted successfully!`);
    } catch (err) {
      showError( `Failed to delete task: ${err}` );
    }
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      await tasksApi.updateTask(id, { status });
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, status } : task))
      );
      showSuccess(`Task updated successfully!`);
    } catch (err) {
      showError( `Failed to update task: ${err}` );
    }
  };

  const filteredTasks =
    filter === 'all' ? tasks : tasks.filter((task) => task.status === filter);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">Error: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h2">
          My Tasks
        </Typography>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, newMode) => newMode && setViewMode(newMode)}
          size="small"
        >
          <ToggleButton value="list" aria-label="list view">
            <ViewList />
          </ToggleButton>
          <ToggleButton value="card" aria-label="card view">
            <ViewModule />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', gap: 0.5 }}>
        <Button
          variant={filter === 'all' ? 'contained' : 'outlined'}
          onClick={() => setFilter('all')}
          sx={{
            borderRadius: '8px',
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          }}
        >
          All ({tasks.length})
        </Button>
        <Button
          variant={filter === TaskStatus.Todo ? 'contained' : 'outlined'}
          onClick={() => setFilter(TaskStatus.Todo)}
          sx={{
            borderRadius: '8px',
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          }}
        >
          To Do ({tasks.filter((t) => t.status === TaskStatus.Todo).length})
        </Button>
        <Button
          variant={filter === TaskStatus.InProgress ? 'contained' : 'outlined'}
          onClick={() => setFilter(TaskStatus.InProgress)}
          sx={{
            borderRadius: '8px',
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          }}
        >
          In Progress ({tasks.filter((t) => t.status === TaskStatus.InProgress).length})
        </Button>
        <Button
          variant={filter === TaskStatus.Done ? 'contained' : 'outlined'}
          onClick={() => setFilter(TaskStatus.Done)}
          sx={{
            borderRadius: '8px',
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          }}
        >
          Done ({tasks.filter((t) => t.status === TaskStatus.Done).length})
        </Button>
      </Box>

      {filteredTasks.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No tasks found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your first task to get started!
          </Typography>
        </Paper>
      ) : viewMode === 'card' ? (
        <Grid container spacing={2}>
          {filteredTasks.map((task) => (
            <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <TaskCard
                task={task}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                onEdit={onEditTask}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onEdit={onEditTask}
              showActions={true}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default TaskList;
