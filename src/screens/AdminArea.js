import React, { useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import AddModal from '../components/Modals/AddUserModal';
import EditModal from '../components/Modals/EditUserModal';
import DeleteModal from '../components/Modals/DeleteUserModal';
import Alert from '../components/Alert';
import useService from '../hooks/useService';

const AdminArea = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState('');
  const [users, setUsers] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const { getUsers } = useService();

  useEffect(() => {
    if ((!error && !users) || shouldUpdate) {
      console.log('here');
      getUsers(setError, setUsers, setShowAlert);
      setShouldUpdate(false)
    }
  }, [getUsers, setUsers, error, users, message, shouldUpdate]);
  console.log(shouldUpdate);
  return (
    <>
      <Alert
        type={error ? 'error' : 'success'}
        message={message}
        show={showAlert}
      />
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Gerenciar <b>Usuários</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <a
                    href="#addUserModal"
                    className="btn btn-success"
                    data-toggle="modal"
                  >
                    <AddIcon
                      width={20}
                      height={20}
                      className="material-icons"
                    />{' '}
                    <span>Adicionar Usuário</span>
                  </a>
                </div>
              </div>
            </div>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map(user => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <a
                          href="#editUserModal"
                          className="edit"
                          data-toggle="modal"
                          onClick={() => setSelectedUser(user)}
                        >
                          <EditIcon
                            width={20}
                            height={20}
                            className="material-icons"
                            data-toggle="tooltip"
                            title="Editar"
                          />
                        </a>
                        <a
                          href="#deleteUserModal"
                          className="delete"
                          data-toggle="modal"
                          onClick={() => setSelectedUser(user)}
                        >
                          <DeleteIcon
                            width={20}
                            height={20}
                            className="material-icons"
                            data-toggle="tooltip"
                            title="Deletar"
                          />
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddModal
        id="addUserModal"
        error={error}
        setError={setError}
        setMessage={setMessage}
        setShowAlert={setShowAlert}
        setShouldUpdate={setShouldUpdate}
      />
      <EditModal
        id="editUserModal"
        user={selectedUser}
        error={error}
        setError={setError}
        setMessage={setMessage}
        setShowAlert={setShowAlert}
        setShouldUpdate={setShouldUpdate}
      />
      <DeleteModal
        id="deleteUserModal"
        userId={selectedUser.id}
        error={error}
        setError={setError}
        setMessage={setMessage}
        setShowAlert={setShowAlert}
        setShouldUpdate={setShouldUpdate}
      />
    </>
  );
};

export default AdminArea;
