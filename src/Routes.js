import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Validations from "./screens/Validations";
import { Login, Register, ValidateDocument, Documents } from "./screens";
import AdminArea from "./screens/AdminArea";
import UserContext from "./context/UserContext";

const Routes = () => {
  const { signedInUser } = useContext(UserContext);
  return (
    <Router basename='document-validator'>
      <Switch>
        {!signedInUser && (
          <Route path='/login' exact={true} component={Login} />
        )}
        {!signedInUser && (
          <Route path='/register' exact={true} component={Register} />
        )}
        {signedInUser && (
          <Route path='/documents' exact={true} component={Documents} />
        )}
        {signedInUser && (
          <Route path='/document/:id' exact={true} component={Validations} />
        )}
        <Route
          path='/validate-document'
          exact={true}
          component={ValidateDocument}
        />
        {JSON.parse(sessionStorage.getItem("user"))?.isAdmin && (
          <Route path='/admin-area' exact={true} component={AdminArea} />
        )}
        <Redirect from='/' to={signedInUser ? "/documents" : "/login"} />
      </Switch>
    </Router>
  );
};

export default Routes;
