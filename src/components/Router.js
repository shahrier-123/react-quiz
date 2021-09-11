import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

import { useAuth } from '../contexts/AuthContext';

export default function Router() {
  const { currentUser } = useAuth();
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      {currentUser ? (
        <>
          <Route exact path="/quiz" component={Quiz} />
          <Route exact path="/result" component={Result} />
        </>
      ) : (
        <>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </>
      )}
    </Switch>
  );
}
