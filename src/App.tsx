import AppLayout from './layouts/AppLayout';
import TasksFeature from './features/task/TasksFeature.tsx';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AppLayout>
        <TasksFeature />
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
