// Define types for better autocomplete and safety
type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

function TypeScriptBasics() {
  const user: User = {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    isAdmin: false,
  };

  // Arrays
  const tags: string[] = ['react', 'typescript', 'vite'];
  
  // Union types
  const status: 'idle' | 'loading' | 'success' | 'error' = 'success';

  return (
    <div>
      <h2>TypeScript Basics</h2>
      <div>
        <p>User: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.isAdmin ? 'Admin' : 'User'}</p>
      </div>
      
      <div>
        <p>Tags: {tags.join(', ')}</p>
        <p>Status: {status}</p>
      </div>
    </div>
  );
}

export default TypeScriptBasics;