import classes from '../styles/Video.module.css';

export default function Video({ title, numQsn, id }) {
  return (
    <div className={classes.video}>
      <img
        src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`}
        alt={title}
      />
      <p>{title}</p>
      <div className={classes.qmeta}>
        <p>{numQsn} Questions</p>
        <p>Total points : {numQsn * 5}</p>
      </div>
    </div>
  );
}
