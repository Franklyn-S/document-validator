import { useState } from 'react';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { POOL_DATA } from '../services';

const userPool = new CognitoUserPool(POOL_DATA);

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userSession, setUserSession] = useState(null);
  const [registeredUser, setRegisteredUser] = useState(null);

  const signUp = (fullName, userName, email, password) => {
    const attrList = [];
    const emailAttribute = {
      Name: 'email',
      Value: email,
    };
    const fullNameAttribute = {
      Name: 'name',
      Value: fullName,
    };
    attrList.push(new CognitoUserAttribute(emailAttribute));
    attrList.push(new CognitoUserAttribute(fullNameAttribute));

    setLoading(true);
    console.log(password);
    userPool.signUp(userName, password, attrList, null, (err, result) => {
      setLoading(false);
      if (err) {
        setError(err.message);
        return;
      }
      setRegisteredUser(result.user);
      setError(null);
    });
  };

  const confirmUser = (userName, code) => {
    setLoading(true);
    const userData = {
      Username: userName,
      Pool: userPool,
    };
    const cognitouser = new CognitoUser(userData);
    cognitouser.confirmRegistration(code, true, (err, result) => {
      setLoading(false);
      if (err) {
        setError(err.message);
      }
      setError(null);
      console.log(result);
      window.location.href = '/document-validator/';
    });
  };

  const signIn = (username, password) => {
    const authData = {
      Username: username,
      Password: password,
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    setLoading(true);
    cognitoUser.authenticateUser(authDetails, {
      onSuccess(result) {
        setError(null);
        setLoading(false);
        setUserSession(result);
        window.location.href = '/document-validator/documents';
      },
      onFailure(err) {
        setError(err.message);
        setLoading(false);
        console.log(err);
      },
    });
  };

  const getAuthenticatedUser = () => {
    return userPool.getCurrentUser();
  };

  const logout = () => {
    getAuthenticatedUser().signOut();
    setUserSession(null);
    setRegisteredUser(null);
  };

  const isAuthenticated = () => {
    const user = getAuthenticatedUser();
    let isAuthenticated = false;
    if (user) {
      user.getSession((err, session) => {
        if (!err && session && session.isValid()) {
          isAuthenticated = true;
        }
      });
    }
    return isAuthenticated;
  };

  const isUserAdmin = () => {
    const user = getAuthenticatedUser();
    let userAcessIsAdmin = false;
    if (user) {
      user.getSession((err, session) => {
        if (!err && session && session.isValid()) {
          if (session.accessToken?.payload['cognito:groups'].length > 0) {
            const group = session.accessToken?.payload['cognito:groups'][0];
            userAcessIsAdmin = group === 'admin';
          }
        }
      });
    }
    return userAcessIsAdmin;
  };

  return {
    error,
    loading,
    userSession,
    registeredUser,
    signIn,
    signUp,
    confirmUser,
    getAuthenticatedUser,
    logout,
    isAuthenticated,
    isUserAdmin,
  };
};

export default useAuth;
