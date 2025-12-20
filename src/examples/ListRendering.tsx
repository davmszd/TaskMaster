import { useState } from 'react';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function ListRendering() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Learn React basics', completed: true },
    { id: 2, title: 'Build a project', completed: false },
    { id: 3, title: 'Deploy to production', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Task List</h2>

      {/* Conditional: show message if empty */}
      {tasks.length === 0 ? (
        <p style={{ color: '#999' }}>No tasks yet. Add one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id} // CRITICAL: key prop for lists
              style={{
                padding: '1rem',
                marginBottom: '0.5rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#999' : '#000',
                  }}
                >
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '1rem' }}>
        <p>Completed: {tasks.filter((t) => t.completed).length} / {tasks.length}</p>
      </div>
    </div>
  );
}

export default ListRendering;