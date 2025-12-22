import useToggle from '../hooks/useToggle';

function UseToggleDemo() {
  const [isVisible, toggleVisible] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(true);
  const [isExpanded, toggleExpanded] = useToggle(false);

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: isDarkMode ? '#222' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
      }}
    >
      <h2>useToggle Hook Demo</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={toggleVisible}>
          {isVisible ? 'Hide' : 'Show'} Secret Message
        </button>
        {isVisible && <p>🎉 This is the secret message!</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={toggleDarkMode}>
          Toggle Theme ({isDarkMode ? 'Dark' : 'Light'})
        </button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={toggleExpanded}>
          {isExpanded ? 'Collapse' : 'Expand'} Details
        </button>
        {isExpanded && (
          <div style={{ marginTop: '0.5rem', padding: '1rem', backgroundColor: '#f0f0f0', color: '#000' }}>
            <p>Here are some expanded details about the content...</p>
            <p>Custom hooks make your code much cleaner!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UseToggleDemo;