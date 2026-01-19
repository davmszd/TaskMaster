import { useState, useEffect } from 'react';

type UseFetchResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: string;
  refetch: () => void;
};

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(url, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, refetchIndex]);

  const refetch = () => {
    setRefetchIndex((prev) => prev + 1);
  };

  return { data, isLoading, error, refetch };
}

export default useFetch;
