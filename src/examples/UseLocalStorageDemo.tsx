import useLocalStorage from '../hooks/useLocalStorage';

function UseLocalStorageDemo() {
  const [name, setName] = useLocalStorage('userName', '');
  const [count, setCount] = useLocalStorage('count', 0);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
        minHeight: '100vh',
      }}
    >
      <h2>useLocalStorage Hook Demo</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              marginLeft: '0.5rem',
              padding: '0.5rem',
              backgroundColor: theme === 'dark' ? '#555' : '#fff',
              color: theme === 'dark' ? '#fff' : '#000',
              border: '1px solid #ddd',
            }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(0)} style={{ marginLeft: '0.5rem' }}>
          Reset
        </button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme (Current: {theme})
        </button>
      </div>

      <p style={{ marginTop: '2rem', fontSize: '0.85rem', opacity: 0.7 }}>
        Refresh the page - your data persists!
      </p>
    </div>
  );
}

export default UseLocalStorageDemo;