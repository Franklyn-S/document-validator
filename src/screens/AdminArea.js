import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import AddModal from '../components/Modals/AddModal';
import EditModal from '../components/Modals/EditModal';
import DeleteModal from '../components/Modals/DeleteModal';

const AdminArea = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const users = [
    { id: 1, name: 'Test 1', email: 'test@test.com', username: 'test213', password: "123" },
    { id: 2, name: 'Test 2', email: 'test@test.com', username: 'test213', password: "123" },
    { id: 3, name: 'Test 3', email: 'test@test.com', username: 'test213', password: "123" },
    { id: 4, name: 'Test 4', email: 'test@test.com', username: 'test213', password: "123" },
    { id: 5, name: 'Test 5', email: 'test@test.com', username: 'test213', password: "123" },
    { id: 6, name: 'Test 6', email: 'test@test.com', username: 'test213', password: "123" },
  ];
  return (
    <>
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
                    href="#addEmployeeModal"
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
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <a
                        href="#editEmployeeModal"
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
                        href="#deleteEmployeeModal"
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
      <AddModal id="addEmployeeModal" />
      <EditModal id="editEmployeeModal" user={selectedUser} />
      <DeleteModal id="deleteEmployeeModal" userId={selectedUser.id} />
    </>
  );
};

export default AdminArea;
