import { useState } from 'react';

function FormBasics() {
  // Each input is "controlled" by React state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [country, setCountry] = useState('us');
  const [subscribe, setSubscribe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    
    console.log({
      name,
      email,
      age: Number(age),
      bio,
      country,
      subscribe,
    });

    alert(`Form submitted! Check console.`);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Controlled Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Text input */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ display: 'block', width: '100%', padding: '0.5rem' }}
            />
          </label>
        </div>

        {/* Email input */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ display: 'block', width: '100%', padding: '0.5rem' }}
            />
          </label>
        </div>

        {/* Number input */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="0"
              max="120"
              style={{ display: 'block', width: '100%', padding: '0.5rem' }}
            />
          </label>
        </div>

        {/* Textarea */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Bio:
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              style={{ display: 'block', width: '100%', padding: '0.5rem' }}
            />
          </label>
          <div style={{ fontSize: '0.85rem', color: '#666' }}>
            {bio.length} characters
          </div>
        </div>

        {/* Select dropdown */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Country:
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{ display: 'block', width: '100%', padding: '0.5rem' }}
            >
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
            </select>
          </label>
        </div>

        {/* Checkbox */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={subscribe}
              onChange={(e) => setSubscribe(e.target.checked)}
            />
            Subscribe to newsletter
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Submit
        </button>
      </form>

      {/* Real-time preview */}
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <h3>Live Preview:</h3>
        <pre style={{ fontSize: '0.85rem' }}>
          {JSON.stringify({ name, email, age, bio, country, subscribe }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default FormBasics;