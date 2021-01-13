import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import {RegisterContainer} from './styled';

const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const register = e => {
    e.preventDefault();
  };
  return (
    <RegisterContainer>
      <form className='text-center jumbotron' onSubmit={register} noValidate>
        <div className='form-group'>
          <label className='control-label'>Nome completo:</label>
          <input
            type='text'
            id='fullName'
            name='fullName'
            className='form-control text-center'
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label className='control-label'>Nome de usuário:</label>
          <input
            type='text'
            id='username'
            name='username'
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
        <div className='form-group'>
          <label className='control-label'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
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
    </RegisterContainer>
  );
};

export default RegisterForm;
