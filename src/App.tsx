import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedInUser } from './actions';


import PrivateRoute from './components/PrivateRoute';
import SignIn from './pages/SignIn/SignIn';
import Chat from './pages/Chat/Chat';
import SignUp from './pages/SignUp/SignUp';

const App = () => {
  const auth = useSelector((state: any) => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    if(!auth.authenticated) {
      dispatch(isLoggedInUser())
    }
  }, []);

  return (
      <div className="App">
          <div className="container">
            <Router>
              <PrivateRoute path="/" exact component={Chat}></PrivateRoute>
              <Route path="/signIn" component={SignIn}></Route>
              <Route path="/signUp" component={SignUp}></Route>
            </Router>
          </div>
      </div>
  );

 
}

export default App;
