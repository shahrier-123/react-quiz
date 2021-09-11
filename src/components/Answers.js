import { Fragment } from 'react';
import classes from '../styles/Answers.module.css';
import Checkbox from './Checkbox';

export default function Answers({ options = [], handleChange, input }) {
  return (
    <div className={classes.answers}>
      {options.map((option, index) => (
        <Fragment key={index}>
          {input ? (
            <Checkbox
              className={classes.answer}
              text={option.title}
              onChange={e => handleChange(e, index)}
              value={index}
              checked={option.checked}
            />
          ) : (
            <Checkbox
              className={`${classes.answer} ${
                option.correct
                  ? classes.correct
                  : option.checked
                  ? classes.wrong
                  : null
              }`}
              text={option.title}
              disabled
              value={index}
              defaultChecked={option.checked}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
