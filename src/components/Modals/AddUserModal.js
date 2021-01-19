import React, { useState } from 'react';
import useService from '../../hooks/useService';
import $ from 'jquery';

const AddUserModal = ({ error, setError, setMessage, setShowAlert }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { postUser } = useService();

  const addUser = async e => {
    e.preventDefault();
    await postUser({ name, username, email, password }, setError, setMessage);
    if (!error) {
      $('.close').click();
      console.log('Usuário Adicionado');
    } else {
      setError(error);
    }
    setShowAlert(true);
  };

  return (
    <div id="addUserModal" className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={addUser}>
            <div className="modal-header">
              <h4 className="modal-title">Adicionar Usuário</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nome Completo</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nome de usuário</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                {confirmPassword !== password && (
                  <div className="alert alert-danger" role="alert">
                    Senhas não conferem.
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Confirmar Senha</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
                {confirmPassword !== password && (
                  <div className="alert alert-danger" role="alert">
                    Senhas não conferem.
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <input
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                value="Cancelar"
              />
              <input
                type="submit"
                className="btn btn-success"
                value="Adicionar"
                disabled={confirmPassword !== password}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
