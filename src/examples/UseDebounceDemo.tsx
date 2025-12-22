import { useState } from 'react';
import useDebounce from '../hooks/useDebounce';

function UseDebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay

  // Simulate search results
  const results = debouncedSearchTerm
    ? [
        `Result for "${debouncedSearchTerm}" #1`,
        `Result for "${debouncedSearchTerm}" #2`,
        `Result for "${debouncedSearchTerm}" #3`,
      ]
    : [];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>useDebounce Hook Demo</h2>
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        Type in the search box. Results appear 500ms after you stop typing.
      </p>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          border: '2px solid #0066cc',
          borderRadius: '8px',
          marginBottom: '1rem',
        }}
      />

      <div
        style={{
          padding: '1rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          minHeight: '60px',
        }}
      >
        <p style={{ margin: '0 0 0.5rem 0' }}>
          <strong>Search term:</strong> {searchTerm}
        </p>
        <p style={{ margin: '0 0 0.5rem 0' }}>
          <strong>Debounced term:</strong> {debouncedSearchTerm || '(none)'}
        </p>

        {results.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <strong>Results:</strong>
            <ul>
              {results.map((result, i) => (
                <li key={i}>{result}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default UseDebounceDemo;