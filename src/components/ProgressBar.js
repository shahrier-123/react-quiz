import { useRef } from 'react';
import { useState } from 'react/cjs/react.development';
import classes from '../styles/ProgressBar.module.css';
import Button from './Button';

export default function ProgressBar({ prevBtn, nextBtn, progress, submit }) {
  const [tooltip, setTooltip] = useState(false);
  const tooltipRef = useRef();

  function toggleTooltip() {
    if (tooltip) {
      setTooltip(false);
      tooltipRef.current.style.display = 'none';
    } else {
      setTooltip(true);
      tooltipRef.current.style.display = 'block';
      tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
    }
  }

  return (
    <div className={classes.progressBar}>
      <Button className={classes.backButton} onClick={prevBtn}>
        <span className="material-icons-outlined"> arrow_back </span>
      </Button>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRef}>
          {progress}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${progress}%` }}
            onMouseOver={toggleTooltip}
            onMouseOut={toggleTooltip}
          ></div>
        </div>
      </div>

      <Button
        className={classes.next}
        onClick={progress === 100 ? submit : nextBtn}
      >
        <span>{progress === 100 ? 'Submit' : 'Next Question'}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
