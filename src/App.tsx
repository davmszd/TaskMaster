import AppLayout from './layouts/AppLayout';
import TasksFeature from './features/task/TasksFeature.tsx';
import TasksFeatureMui from './features/task/TasksFeatureMui.tsx';
import { ThemeProvider } from './contexts/ThemeContext';
import { useState } from 'react';
import { Button, Box, ButtonGroup } from '@mui/material';

type View = 'tasks-original' | 'tasks-mui';

function App() {
  const [currentView, setCurrentView] = useState<View>('tasks-mui');

  return (
    <ThemeProvider>
      <AppLayout>
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ButtonGroup variant="outlined" aria-label="navigation button group">
            <Button
              variant={
                currentView === 'tasks-original' ? 'contained' : 'outlined'
              }
              onClick={() => setCurrentView('tasks-original')}
            >
              Tasks (Original)
            </Button>
            <Button
              variant={currentView === 'tasks-mui' ? 'contained' : 'outlined'}
              onClick={() => setCurrentView('tasks-mui')}
            >
              Tasks (MUI)
            </Button>
          </ButtonGroup>
        </Box>
        {currentView === 'tasks-original' && <TasksFeature />}
        {currentView === 'tasks-mui' && <TasksFeatureMui />}
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
