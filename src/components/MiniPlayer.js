import ReactPlayer from 'react-player/youtube';
import { useRef, useState } from 'react';
import classes from '../styles/MiniPlayer.module.css';

export default function MiniPlayer({ title, videoId }) {
  const buttonRef = useRef();
  const [click, setClick] = useState();

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  function togglePlayer() {
    if (click) {
      buttonRef.current.classList.add(classes.floatingBtn);
      setClick(false);
    } else {
      buttonRef.current.classList.remove(classes.floatingBtn);
      setClick(true);
    }
  }

  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={buttonRef}
      onClick={togglePlayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        play_circle_filled
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={togglePlayer}
      >
        close
      </span>
      {/* <img src="/images/3.jpg" alt="video" /> */}

      <ReactPlayer
        url={videoUrl}
        className={classes.player}
        width="300px"
        height="168px"
        playing={click}
        controls
      />
      <p>{title}</p>
    </div>
  );
}
