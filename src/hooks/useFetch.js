import { useEffect, useState } from 'react';

export default function useFetch(url, headers, method = 'GET') {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(url, {
          method,
          headers,
        });

        const data = await response.json();
        setLoading(false);

        setResult(data);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchRequest();
  }, []);

  return { loading, error, result };
}
