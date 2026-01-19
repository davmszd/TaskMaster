import { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TaskList from './TaskList';
import type { Task } from '../../types';
import TaskForm from './TaskForm.tsx';
import { tasksApi } from '../../api/TaskServiceFactory.ts';

function TasksFeature() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const newTask = await tasksApi.createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
      // TODO: Show error message to user
    }
  };

  const handleEditTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (!editingTask) return;

    try {
      const updatedTask = await tasksApi.updateTask(editingTask.id, taskData);
      setTasks((prev) =>
        prev.map((task) => (task.id === editingTask.id ? updatedTask : task))
      );
      setIsEditModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
      // TODO: Show error message to user
    }
  };

  const openEditModal = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setIsEditModalOpen(true);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          New Task
        </Button>
      </Box>

      <Dialog
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TaskForm
              onSubmit={handleAddTask}
              onCancel={() => setIsCreateModalOpen(false)}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTask(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TaskForm
              key={editingTask?.id || 'new'}
              onSubmit={handleEditTask}
              onCancel={() => {
                setIsEditModalOpen(false);
                setEditingTask(null);
              }}
              initialTask={editingTask || undefined}
              isEdit={true}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <TaskList tasks={tasks} setTasks={setTasks} onEditTask={openEditModal} />
    </>
  );
}

export default TasksFeature;
