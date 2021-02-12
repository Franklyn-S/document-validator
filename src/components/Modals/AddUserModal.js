import React, { useState } from "react";
import useService from "../../hooks/useService";
import $ from "jquery";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Button, Icons } from "../RegisterForm/styled";
import PhoneInput from "react-phone-number-input";

const AddUserModal = ({
  error,
  setError,
  setMessage,
  setShowAlert,
  setShouldUpdate,
  setLoading,
}) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phones, setPhones] = useState([""]);

  const { postUser } = useService();

  const addUser = e => {
    e.preventDefault();
    postUser(
      { fullName: name, username, email, password, phones },
      setError,
      setMessage,
      setShouldUpdate,
      setLoading
    );
    if (!error) {
      $("#addModalCloseButton").click();
    } else {
      setError(error);
    }
    setShowAlert(true);
  };

  return (
    <div id='addUserModal' className='modal fade'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <form onSubmit={addUser}>
            <div className='modal-header'>
              <h4 className='modal-title'>Adicionar Usuário</h4>
              <button
                id='addModalCloseButton'
                type='button'
                className='close'
                data-dismiss='modal'
                aria-hidden='true'
              >
                &times;
              </button>
            </div>
            <div className='modal-body'>
              <div className='form-group'>
                <label>Nome Completo</label>
                <input
                  type='text'
                  className='form-control'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Nome de usuário</label>
                <input
                  type='text'
                  className='form-control'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label>E-mail</label>
                <input
                  type='email'
                  className='form-control'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div htmlFor='phone' className='form-group'>
                <label className='control-label'>Telefones:</label>
                {phones?.map((phone, index) => {
                  return (
                    <PhoneInput
                      key={index}
                      id={phone}
                      country='BR'
                      defaultCountry='BR'
                      placeholder={`Número de telefone ${index + 1}`}
                      value={phone}
                      onChange={newPhone =>
                        setPhones(oldPhones => {
                          const newPhones = oldPhones;
                          newPhones[index] = newPhone || "";
                          return newPhones;
                        })
                      }
                    />
                  );
                })}
                <Icons>
                  <Button
                    onClick={() =>
                      setPhones(oldPhones => {
                        const newPhones = oldPhones.slice(0, -1);
                        return newPhones;
                      })
                    }
                  >
                    <FaMinus />
                  </Button>
                  <Button
                    onClick={() =>
                      setPhones(oldPhones => {
                        const newPhones = [...oldPhones, ""];
                        return newPhones;
                      })
                    }
                  >
                    <FaPlus />
                  </Button>
                </Icons>
              </div>
              <div className='form-group'>
                <label>Senha</label>
                <input
                  type='password'
                  className='form-control'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                {confirmPassword !== password && (
                  <div className='alert alert-danger' role='alert'>
                    Senhas não conferem.
                  </div>
                )}
              </div>
              <div className='form-group'>
                <label>Confirmar Senha</label>
                <input
                  type='password'
                  className='form-control'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
                {confirmPassword !== password && (
                  <div className='alert alert-danger' role='alert'>
                    Senhas não conferem.
                  </div>
                )}
              </div>
            </div>
            <div className='modal-footer'>
              <input
                type='button'
                className='btn btn-default'
                data-dismiss='modal'
                value='Cancelar'
              />
              <input
                type='submit'
                className='btn btn-success'
                value='Adicionar'
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
