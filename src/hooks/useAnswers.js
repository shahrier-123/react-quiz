import { getDatabase, get, ref, query, orderByKey } from 'firebase/database';
import { useEffect, useState } from 'react';

export default function useAnswers(videoId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      const db = getDatabase();
      const answerRef = ref(db, `/answers/${videoId}/questions`);
      const answersQuery = query(answerRef, orderByKey());

      try {
        setLoading(true);
        setError(false);

        const snapshot = await get(answersQuery);

        setLoading(false);

        if (snapshot.exists()) {
          setAnswers(prevAnswers => [
            ...prevAnswers,
            ...Object.values(snapshot.val()),
          ]);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    fetchAnswers();
  }, [videoId]);

  return {
    loading,
    error,
    answers,
  };
}
