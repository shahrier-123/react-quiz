import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../styles/App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

import { AuthContextProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute exact path="/signup" component={Signup} />
            <PublicRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/quiz/:id" component={Quiz} />
            <PrivateRoute exact path="/result/:id" component={Result} />
          </Switch>
        </Layout>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
