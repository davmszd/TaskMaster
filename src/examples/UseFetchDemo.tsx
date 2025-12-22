import useFetch from '../hooks/useFetch';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

function UseFetchDemo() {
  const { data: users, isLoading, error, refetch } = useFetch<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  );

  if (isLoading) {
    return <div style={{ padding: '2rem' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', color: '#c00' }}>
        Error: {error}
        <button onClick={refetch} style={{ marginLeft: '1rem' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h2>Users (Custom Hook)</h2>
        <button onClick={refetch}>Refresh</button>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {users?.map((user) => (
          <div
            key={user.id}
            style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}
          >
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UseFetchDemo;