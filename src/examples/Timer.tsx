import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    // Set up interval
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup: clear interval when component unmounts or isRunning changes
    return () => {
      clearInterval(intervalId);
      console.log('Timer cleanup: interval cleared');
    };
  }, [isRunning]); // Re-run when isRunning changes

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Timer</h2>

      <div
        style={{
          fontSize: '3rem',
          fontFamily: 'monospace',
          margin: '1rem 0',
          fontWeight: 'bold',
        }}
      >
        {formatTime(seconds)}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => {
            setSeconds(0);
            setIsRunning(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;