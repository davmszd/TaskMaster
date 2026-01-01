import { useState, useEffect } from 'react';
import { tasksApi } from '../../api/tasks';
import type { Task } from '../../types';
import TaskCardMui from './TaskCardMui';
import {
  Box,
  Typography,
  Button,
<<<<<<< Updated upstream
=======
  ButtonGroup,
>>>>>>> Stashed changes
  CircularProgress,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
} from '@mui/material';
import { ViewList, ViewModule } from '@mui/icons-material';
import Grid from '@mui/material/Grid';

type FilterStatus = 'all' | Task['status'];
type ViewMode = 'list' | 'card';

type TaskListMuiProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

function TaskListMui({ tasks, setTasks }: TaskListMuiProps) {
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

<<<<<<< Updated upstream
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
          variant={filter === 'todo' ? 'contained' : 'outlined'}
          onClick={() => setFilter('todo')}
          sx={{
            borderRadius: '8px',
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          }}
        >
          To Do ({tasks.filter((t) => t.status === 'todo').length})
        </Button>
        <Button
          variant={filter === 'in-progress' ? 'contained' : 'outlined'}
          onClick={() => setFilter('in-progress')}
          sx={{
            borderRadius: '8px',
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          }}
        >
          In Progress (
          {tasks.filter((t) => t.status === 'in-progress').length})
        </Button>
        <Button
          variant={filter === 'done' ? 'contained' : 'outlined'}
          onClick={() => setFilter('done')}
          sx={{
            borderRadius: '8px',
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          }}
        >
          Done ({tasks.filter((t) => t.status === 'done').length})
        </Button>
=======
      <Box sx={{ mb: 3 }}>
        <ButtonGroup variant="outlined" fullWidth>
          <Button
            variant={filter === 'all' ? 'contained' : 'outlined'}
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </Button>
          <Button
            variant={filter === 'todo' ? 'contained' : 'outlined'}
            onClick={() => setFilter('todo')}
          >
            To Do ({tasks.filter((t) => t.status === 'todo').length})
          </Button>
          <Button
            variant={filter === 'in-progress' ? 'contained' : 'outlined'}
            onClick={() => setFilter('in-progress')}
          >
            In Progress (
            {tasks.filter((t) => t.status === 'in-progress').length})
          </Button>
          <Button
            variant={filter === 'done' ? 'contained' : 'outlined'}
            onClick={() => setFilter('done')}
          >
            Done ({tasks.filter((t) => t.status === 'done').length})
          </Button>
        </ButtonGroup>
>>>>>>> Stashed changes
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
              <TaskCardMui
                task={task}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                onEdit={(id) => alert(`Edit task ${id}`)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredTasks.map((task) => (
            <TaskCardMui
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onEdit={(id) => alert(`Edit task ${id}`)}
              showActions={true}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default TaskListMui;
