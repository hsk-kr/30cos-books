import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SearchPage } from './components/pages/SearchPage';

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchPage />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
