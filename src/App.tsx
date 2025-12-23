import AppLayout from './layouts/AppLayout';
import TaskList from './features/tasks/TaskList';

function App() {
  return (
    <AppLayout>
      <TaskList />
    </AppLayout>
  );
}

export default App;