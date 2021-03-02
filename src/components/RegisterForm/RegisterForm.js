import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import PhoneInput from "react-phone-number-input";
import { FaPlus, FaMinus } from "react-icons/fa";
import useService from "../../hooks/useService";
import { Button, Icons, RegisterContainer } from "./styled";

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phones, setPhones] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const { postUser } = useService();

  const onSubmit = e => {
    const setShouldUpdate = shouldUpdate => {
      if (shouldUpdate) {
        window.location.href = "/document-validator/login";
      }
    };
    e.preventDefault();
    postUser(
      { fullName, username, email, password, phones },
      setError,
      setMessage,
      setShouldUpdate,
      setLoading
    );
  };
  return (
    <RegisterContainer>
      <form className='text-center jumbotron' onSubmit={onSubmit} noValidate>
        <h1>Cadastre-se:</h1>
        <div className='form-group'>
          <label htmlFor='fullName' className='control-label'>
            Nome completo:
          </label>
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
          <label htmlFor='username' className='control-label'>
            Nome de usuário:
          </label>
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
        <div htmlFor='email' className='form-group'>
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
        <div htmlFor='password' className='form-group'>
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
          <label htmlFor='confirmPassword' className='control-label'>
            Confirmar Senha:
          </label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className='form-control text-center'
            required
          />
        </div>
        {loading ? (
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        ) : (
          <button className='btn btn-primary' type='submit'>
            Cadastrar
          </button>
        )}
      </form>
      {error && message && (
        <div className='col-xs-12 col-sm-10 col-md-6 cold-sm-offset-1 col-md-offset-3 text-center flex-center container'>
          <Alert variant='danger'>{message}</Alert>
        </div>
      )}
      {password !== confirmPassword && (
        <div className='col-xs-12 col-sm-10 col-md-6 cold-sm-offset-1 col-md-offset-3 text-center flex-center container'>
          <Alert variant='danger'>Senhas são diferentes</Alert>
        </div>
      )}
    </RegisterContainer>
  );
};

export default RegisterForm;
