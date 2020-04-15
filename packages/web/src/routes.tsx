import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

function Routes() {
  return (
    <Switch>
      <Route path='/sign-in'>
        <SignIn />
      </Route>
      <Route path='/sign-up'>
        <SignUp />
      </Route>
      <Route
        path='/home'
        render={({ location }) => {
            const token = localStorage.getItem('DTALK_TOKEN');
            console.log('token in initialization -> ', token);
            if (token) {
              return <Home />
            } else {
              return <Redirect to={{pathname: '/sign-in', state: {from: location}}}/>
            }
          }
        }
      />
    </Switch>
  )
}

export default Routes;
