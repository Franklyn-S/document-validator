import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Validations from './screens/Validations';
import useAuth from './hooks/useAuth';
import { Login, Register, ValidateDocument, Documents } from './screens';
import AdminArea from './screens/AdminArea';

const Routes = () => {
  const { isAuthenticated, isUserAdmin } = useAuth();
  return (
    <Router basename="document-validator">
      <Switch>
        {!isAuthenticated() && (
          <Route path="/login" exact={true} component={Login} />
        )}
        {!isAuthenticated() && (
          <Route path="/register" exact={true} component={Register} />
        )}
        {isAuthenticated() && (
          <Route path="/documents" exact={true} component={Documents} />
        )}
        {isAuthenticated() && (
          <Route path="/document/:id" exact={true} component={Validations} />
        )}
        <Route
          path="/validate-document"
          exact={true}
          component={ValidateDocument}
        />
        {isUserAdmin() && <Route path="/admin-area" component={AdminArea} />}
        <Redirect from="/" to={isAuthenticated() ? '/documents' : '/login'} />
      </Switch>
    </Router>
  );
};

export default Routes;
