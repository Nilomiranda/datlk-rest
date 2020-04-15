import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import PublicationPage from "./pages/PublicationPage";

function Routes() {
  return (
    <Switch>
      <Route
        path='/'
        exact={true}
        render={({ location }) => {
          const token = localStorage.getItem('DTALK_TOKEN');
          if (token) {
            return <Home />
          } else {
            return <SignIn />
          }
        }
        }
      />
      <Route path='/sign-in'>
        <SignIn />
      </Route>
      <Route path='/sign-up'>
        <SignUp />
      </Route>
      <Route path="/publication/:id">
        <PublicationPage />
      </Route>
      <Route
        path='/home'
        render={({ location }) => {
            const token = localStorage.getItem('DTALK_TOKEN');
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
