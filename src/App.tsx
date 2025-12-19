import Button from './components/Button';
import Card from './components/Card';
import Badge from './components/Badge';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Component Basics</h1>
      
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge text="New" color="blue" />
        <Badge text="Success" color="green" />
        <Badge text="Error" color="red" />
        <Badge text="Warning" color="yellow" />
        <Badge text="Default" color="gray" />
      </div>

      <Card
        title="Welcome to React"
        description="This is a reusable card component"
        footer={
          <>
            <Button onClick={handleClick}>Learn More</Button>
            <Button onClick={handleClick} variant="secondary">
              Cancel
            </Button>
          </>
        }
      />

      <Card
        title="TypeScript Integration"
        description="Type-safe props prevent errors at compile time"
      />
    </div>
  );
}

export default App;