import Video from './Video';
import classes from '../styles/Videos.module.css';
import { Link } from 'react-router-dom';
import useVideoList from '../hooks/useVideoList';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';

export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);

  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          className={classes.videos}
          dataLength={videos.length}
          next={() => setPage(page + 8)}
          loader="Loading...."
          hasMore={hasMore}
        >
          {videos.map(video =>
            video.numQsn > 0 ? (
              <Link
                key={video.youtubeID}
                to={{
                  pathname: `/quiz/${video.youtubeID}`,
                  state: {
                    videoTitle: video.title,
                  },
                }}
              >
                <Video
                  title={video.title}
                  numQsn={video.numQsn}
                  id={video.youtubeID}
                />
              </Link>
            ) : (
              <Video
                title={video.title}
                numQsn={video.numQsn}
                key={video.youtubeID}
                id={video.youtubeID}
              />
            )
          )}
        </InfiniteScroll>
      )}

      {loading && <p>Loading...</p>}
      {!loading && videos.length === 0 && <div>No data found</div>}
      {error && <p>There was an error</p>}
    </div>
  );
}
