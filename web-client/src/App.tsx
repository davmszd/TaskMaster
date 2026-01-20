import AppLayout from './layouts/AppLayout';
import TasksFeature from './features/task';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AppLayout>
          <TasksFeature />
        </AppLayout>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
