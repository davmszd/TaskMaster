import { useState } from 'react';
import { Box, TextField, Button, Stack, MenuItem } from '@mui/material';
import type { Task } from '../../types';
import { TaskStatus, TaskPriority } from '../../types';

interface TaskFormMuiProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  initialTask?: Task;
  isEdit?: boolean;
}

function TaskForm({
  onSubmit,
  onCancel,
  initialTask,
  isEdit = false,
}: TaskFormMuiProps) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(
    initialTask?.description || ''
  );
  const [priority, setPriority] = useState<TaskPriority>(
    initialTask?.priority ?? TaskPriority.Medium
  );
  const [status, setStatus] = useState<TaskStatus>(
    initialTask?.status ?? TaskStatus.Todo
  );
  const [dueDate, setDueDate] = useState(
    initialTask?.dueDate
      ? new Date(initialTask.dueDate).toISOString().split('T')[0]
      : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    });

    if (!isEdit) {
      setTitle('');
      setDescription('');
      setPriority(TaskPriority.Medium);
      setStatus(TaskStatus.Todo);
      setDueDate('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          autoFocus
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />

        <TextField
          select
          label="Priority"
          value={priority}
          onChange={(e) =>
            setPriority(parseInt(e.target.value) as TaskPriority)
          }
          fullWidth
        >
          <MenuItem value={TaskPriority.Low}>Low</MenuItem>
          <MenuItem value={TaskPriority.Medium}>Medium</MenuItem>
          <MenuItem value={TaskPriority.High}>High</MenuItem>
        </TextField>

        {isEdit && (
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) =>
              setStatus(parseInt(e.target.value) as TaskStatus)
            }
            fullWidth
          >
            <MenuItem value={TaskStatus.Todo}>To Do</MenuItem>
            <MenuItem value={TaskStatus.InProgress}>In Progress</MenuItem>
            <MenuItem value={TaskStatus.Done}>Done</MenuItem>
          </TextField>
        )}

        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={!title.trim()}>
            {isEdit ? 'Update Task' : 'Create Task'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default TaskForm;
