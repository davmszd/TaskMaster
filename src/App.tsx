import AppLayout from './layouts/AppLayout';
import TasksFeature from './features/task/TasksFeature.tsx';
import TasksFeatureMui from './features/task/TasksFeatureMui.tsx';
<<<<<<< Updated upstream
=======
import MuiDemo from './pages/MuiDemo';
>>>>>>> Stashed changes
import { ThemeProvider } from './contexts/ThemeContext';
import { useState } from 'react';
import { Button, Box, ButtonGroup } from '@mui/material';

<<<<<<< Updated upstream
type View = 'tasks-original' | 'tasks-mui';

function App() {
  const [currentView, setCurrentView] = useState<View>('tasks-mui');
=======
type View = 'mui-demo' | 'tasks-original' | 'tasks-mui';

function App() {
  const [currentView, setCurrentView] = useState<View>('mui-demo');
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
              variant={currentView === 'mui-demo' ? 'contained' : 'outlined'}
              onClick={() => setCurrentView('mui-demo')}
            >
              MUI Demo
            </Button>
            <Button
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
        {currentView === 'mui-demo' && <MuiDemo />}
>>>>>>> Stashed changes
        {currentView === 'tasks-original' && <TasksFeature />}
        {currentView === 'tasks-mui' && <TasksFeatureMui />}
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
