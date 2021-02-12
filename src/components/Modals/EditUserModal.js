import React, { useEffect, useState } from "react";
import useService from "../../hooks/useService";
import $ from "jquery";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Icons, Button } from "../RegisterForm/styled";
import PhoneInput from "react-phone-number-input";

const EditUserModal = ({
  user,
  error,
  setError,
  setMessage,
  setShowAlert,
  setShouldUpdate,
  setLoading,
}) => {
  const [fullName, setFullName] = useState(user.fullName || "");
  const [userName, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [phones, setPhones] = useState(
    user?.phones?.map(p => p.phoneNumber) || []
  );
  const { putUser } = useService();
  useEffect(() => {
    setFullName(user.fullName || "");
    setUsername(user.username || "");
    setEmail(user.email || "");
    setPassword("");
    setPhones(user?.phones?.map(p => p.phoneNumber) || []);
  }, [user]);

  const EditUser = async e => {
    e.preventDefault();
    await putUser(
      {
        id: user.userId,
        fullName,
        username: userName,
        password,
        email,
        phones,
      },
      setError,
      setMessage,
      setShouldUpdate,
      setLoading
    );
    setShowAlert(true);
    if (error) {
      console.log(error);
    } else {
      $("#editModalCloseButton").click();
    }
    console.log("Usuário Editado");
  };
  return (
    <div id='editUserModal' className='modal fade'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <form onSubmit={EditUser}>
            <div className='modal-header'>
              <h4 className='modal-title'>Editar Usuário</h4>
              <button
                id='editModalCloseButton'
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
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Nome de usuário</label>
                <input
                  type='text'
                  className='form-control'
                  value={userName}
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
                      id={phone?.phoneNumber || phone}
                      country='BR'
                      defaultCountry='BR'
                      placeholder={`Número de telefone ${index + 1}`}
                      value={phone?.phoneNumber || phone}
                      onChange={newPhone =>
                        setPhones(oldPhones => {
                          const newPhones = oldPhones;
                          newPhones[index] =
                            newPhone?.phoneNumber || newPhone || "";
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
              </div>
            </div>
            <div className='modal-footer'>
              <input
                type='button'
                className='btn btn-default'
                data-dismiss='modal'
                value='Cancelar'
              />
              <input type='submit' className='btn btn-success' value='Salvar' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
