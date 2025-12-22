import UseLocalStorageDemo from './examples/UseLocalStorageDemo';
import UseFetchDemo from './examples/UseFetchDemo';
import UseToggleDemo from './examples/UseToggleDemo';
import UseDebounceDemo from './examples/UseDebounceDemo';

function App() {
  return (
    <div>
      <UseLocalStorageDemo />
      <hr style={{ margin: '2rem' }} />
      <UseFetchDemo />
      <hr style={{ margin: '2rem' }} />
      <UseToggleDemo />
      <hr style={{ margin: '2rem' }} />
      <UseDebounceDemo />
    </div>
  );
}

export default App;