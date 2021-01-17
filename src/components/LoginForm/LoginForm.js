import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import useAuth from '../../hooks/useAuth';
import { LoginContainer } from './styled';

const LoginForm = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { error, loading, signIn } = useAuth();

  const logar = e => {
    e.preventDefault();
    signIn(userName, password);
  };

  return (
    <LoginContainer>
      <form className="text-center jumbotron" onSubmit={logar} noValidate>
        <h1>Entre:</h1>
        <div className="form-group">
          <label htmlFor="userName" className="control-label">
            Nome de usuário:
          </label>
          <input
            type="text"
            id="userName"
            name="usename"
            className="form-control text-center"
            value={userName}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="control-label">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-control text-center"
            required
          />
          {loading ? (
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <button className="btn btn-primary" type="submit">
              Entrar
            </button>
          )}
        </div>
      </form>
      {error && (
        <div className="col-xs-12 col-sm-10 col-md-6 cold-sm-offset-1 col-md-offset-3 text-center flex-center container">
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
    </LoginContainer>
  );
};

export default LoginForm;
