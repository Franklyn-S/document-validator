import React, { useContext, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { LoginContainer } from "./styled";
import bcrypt from "bcryptjs";
import useService from "../../hooks/useService";
import UserContext from "../../context/UserContext";

const LoginForm = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setSignedInUser } = useContext(UserContext);
  const { getUserbyUsername } = useService();

  const authenticateUser = (user, password, callback) => {
    bcrypt.compare(password, user.password, function (err, res) {
      if (!err) {
        if (res && callback) {
          callback();
        }
        if (!res) {
          setError("Usuário ou senha inválidos!");
        }
      }
      return false;
    });
  };

  const logar = async e => {
    e.preventDefault();
    const user = await getUserbyUsername(userName, setLoading, setError);
    if (user) {
      authenticateUser(user, password, () => {
        sessionStorage.setItem("user", JSON.stringify(user));
        setSignedInUser(user);
      });
    } else {
      setError("Usuário ou senha inválidos!");
    }
  };
  return (
    <LoginContainer>
      <form className='text-center jumbotron' onSubmit={logar} noValidate>
        <h1>Entre:</h1>
        <div className='form-group'>
          <label htmlFor='userName' className='control-label'>
            Nome de usuário:
          </label>
          <input
            type='text'
            id='userName'
            name='usename'
            className='form-control text-center'
            value={userName}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password' className='control-label'>
            Senha:
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='form-control text-center'
            required
          />
          {loading ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          ) : (
            <button className='btn btn-primary' type='submit'>
              Entrar
            </button>
          )}
        </div>
      </form>
      {error && (
        <div className='col-xs-12 col-sm-10 col-md-6 cold-sm-offset-1 col-md-offset-3 text-center flex-center container'>
          <Alert variant='danger'>{error}</Alert>
        </div>
      )}
    </LoginContainer>
  );
};

export default LoginForm;
