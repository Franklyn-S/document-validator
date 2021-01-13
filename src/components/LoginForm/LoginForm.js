import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import {LoginContainer} from './styled';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  console.log(username);
  const logar = e => {
    e.preventDefault();
  };
  return (
    <LoginContainer>
      <form className='text-center jumbotron' onSubmit={logar} noValidate>
        <div className='form-group'>
          <label className='control-label'>Nome de usuário:</label>
          <input
            type='text'
            id='username'
            name='usename'
            className='form-control text-center'
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label className='control-label'>Senha:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='form-control text-center'
            required
          />
        </div>
      </form>
      {error && (
        <div className='col-xs-12 col-sm-10 col-md-6 cold-sm-offset-1 col-md-offset-3 text-center'>
          <Alert variant='danger'>Algo deu errado.</Alert>
        </div>
      )}
    </LoginContainer>
  );
};

export default LoginForm;
