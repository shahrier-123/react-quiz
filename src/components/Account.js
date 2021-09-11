import { Link } from 'react-router-dom';
import classes from '../styles/Account.module.css';
import { useAuth } from '../contexts/AuthContext';

export default function Account() {
  const { currentUser, signout } = useAuth();

  return (
    <div className={classes.account}>
      {currentUser ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>

          <span>{currentUser.displayName}</span>
          <span
            className="material-icons-outlined"
            onClick={signout}
            title="Logout"
          >
            logout
          </span>
        </>
      ) : (
        <>
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}
