import { useState, useEffect } from 'react';

import { getDatabase, get, ref, query, orderByKey } from 'firebase/database';

export default function useQuestions(videoID) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const db = getDatabase();
      const quizRef = ref(db, `quiz/${videoID}/questions`);
      const quizQuery = query(quizRef, orderByKey());

      try {
        setLoading(true);
        setError(false);
        const snapshot = await get(quizQuery);

        setLoading(false);

        if (snapshot.exists()) {
          setQuestions(prevQsn => [
            ...prevQsn,
            ...Object.values(snapshot.val()),
          ]);
        }
      } catch (err) {
        setLoading(false);
        setError(true);

        console.log(err);
      }
    }

    fetchQuestions();
  }, [videoID]);

  return { questions, loading, error };
}
