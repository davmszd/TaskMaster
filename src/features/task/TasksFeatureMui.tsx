import { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TaskListMui from './TaskListMui';
import TaskFormMui from './TaskFormMui';
import type { Task } from '../../types';

function TasksFeatureMui() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
        >
          New Task
        </Button>
      </Box>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TaskFormMui
              onSubmit={handleAddTask}
              onCancel={() => setIsModalOpen(false)}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <TaskListMui tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default TasksFeatureMui;
