import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {Home, Login, Register, ValidateDocument} from './screens';

const Routes = () => {
  return (
    <Router basename='document-validator'>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' exact={true} component={Register} />
        <Route path='/home' exact={true} component={Home} />
        <Route
          path='/validate-document'
          exact={true}
          component={ValidateDocument}
        />
        <Redirect from='/' to='/login' />
      </Switch>
    </Router>
  );
};

export default Routes;
