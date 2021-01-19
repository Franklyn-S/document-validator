import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import useAuth from '../../hooks/useAuth';
import ValideteUserForm from '../ValideteUserForm/ValideteUserForm';
import {
  RegisterContainer,
  ValidationButton,
  ValidationContainer,
} from './styled';

const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [confirmUser, setConfirmUser] = useState(false);

  const { error, loading, signUp } = useAuth();

  const onSubmit = e => {
    e.preventDefault();
    console.log(e);
    signUp(fullName, userName, email, password);
  };

  return (
    <RegisterContainer>
      <form className="text-center jumbotron" onSubmit={onSubmit} noValidate>
        <h1>Cadastre-se:</h1>
        <div className="form-group">
          <label htmlFor="fullName" className="control-label">
            Nome completo:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="form-control text-center"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userName" className="control-label">
            Nome de usuário:
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="form-control text-center"
            value={userName}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div htmlFor="email" className="form-group">
          <label className="control-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control text-center"
            required
          />
        </div>
        <div htmlFor="password" className="form-group">
          <label className="control-label">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-control text-center"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="control-label">
            Confirmar Senha:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="form-control text-center"
            required
          />
        </div>
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <button className="btn btn-primary" type="submit">
            Cadastrar
          </button>
        )}
      </form>
      {error && (
        <div className="col-xs-12 col-sm-10 col-md-6 cold-sm-offset-1 col-md-offset-3 text-center flex-center container">
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
      {password !== confirmPassword && (
        <div className="col-xs-12 col-sm-10 col-md-6 cold-sm-offset-1 col-md-offset-3 text-center flex-center container">
          <Alert variant="danger">Senhas são diferentes</Alert>
        </div>
      )}
      {!confirmUser ? (
        <div className="row">
          <ValidationContainer className="col-xs-12 col-sm-10 col-md-6 cold-sm-offset-1 col-md-offset-3 text-center">
            <ValidationButton
              className="btn btn-default"
              type="button"
              onClick={() => setConfirmUser(true)}
            >
              Confirme sua conta
            </ValidationButton>
          </ValidationContainer>
        </div>
      ) : (
        <ValideteUserForm />
      )}
    </RegisterContainer>
  );
};

export default RegisterForm;
