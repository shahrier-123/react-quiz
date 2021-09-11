import { useEffect, useState } from 'react';

import {
  getDatabase,
  ref,
  query,
  orderByKey,
  get,
  startAt,
  limitToFirst,
} from 'firebase/database';

export default function useVideoList(page) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      const db = getDatabase();
      const videoRef = ref(db, 'videos');
      const videoQuery = query(
        videoRef,
        orderByKey(),
        startAt('' + page),
        limitToFirst(8)
      );

      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(videoQuery);

        setLoading(false);
        if (snapshot.exists()) {
          setVideos(prevVideos => {
            return [...prevVideos, ...Object.values(snapshot.val())];
          });
        } else {
          setHasMore(false);
        }
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    }

    fetchVideos();
  }, [page]);

  return { videos, loading, error, hasMore };
}
