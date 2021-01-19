import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import useAuth from '../../hooks/useAuth';
import { ValideteUserFormStyle } from './styled';

const ValideteUserForm = () => {
  const [userName, setUserName] = useState('');
  const [validationCode, setValidationCode] = useState('');

  const { error, loading, confirmUser } = useAuth();

  const onConfirm = e => {
    e.preventDefault();
    confirmUser(userName, validationCode);
  };

  return (
    <div className="row center-block">
      <ValideteUserFormStyle
        className="text-center jumbotron"
        onSubmit={onConfirm}
        noValidate
      >
        <h1>Valide sua conta:</h1>
        <div htmlFor="userName" className="form-group">
          <label className="control-label">Nome de usuário:</label>
          <input
            type="userName"
            id="userName"
            name="userName"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            className="form-control text-center"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="validationCode" className="control-label">
            Código de validação (enviado por e-mail):
          </label>
          <input
            type="validationCode"
            id="validationCode"
            name="validationCode"
            value={validationCode}
            onChange={e => setValidationCode(e.target.value)}
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
            Validar
          </button>
        )}
      </ValideteUserFormStyle>
      {error && (
        <div className="col-xs-12 col-sm-10 col-md-6 cold-sm-offset-1 col-md-offset-3 text-center flex-center container">
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
    </div>
  );
};

export default ValideteUserForm;
