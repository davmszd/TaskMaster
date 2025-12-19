import { useState } from 'react';
import UserProfile from './components/UserProfile';
import LikeButton from './components/LikeButton';
import Counter from './components/Counter';
import TextInput from './components/TextInput';

function App() {
  const [totalLikes, setTotalLikes] = useState(0);

  const handleLike = (newCount: number) => {
    setTotalLikes((prev) => prev + (newCount > 0 ? 1 : -1));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>Props, State & Events</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Props Example</h2>
        <UserProfile
          name="Alice Johnson"
          email="alice@example.com"
          role="admin"
          isOnline={true}
        />
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>State Example</h2>
        <Counter />
      </section>      <section style={{ marginBottom: '2rem' }}>
        <h2>State + Props (Child to Parent Communication)</h2>
        <p>Total likes across all buttons: {totalLikes}</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <LikeButton initialLikes={5} onLike={handleLike} />
          <LikeButton initialLikes={12} onLike={handleLike} />
          <LikeButton onLike={handleLike} />
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Text Input with Character Count</h2>
        <TextInput 
          label="Write your message"
          maxLength={15}
          placeholder="Start typing to see the character count..."
        />
      </section>
    </div>
  );
}

export default App;