import React, { useState } from "react";
import styled from "styled-components";
import Alert from "../components/Alert";
import useService from "../hooks/useService";

const ValidateDocument = () => {
  const [fileId, setFileId] = useState("");
  const [motivation, setMotivation] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [base64, setBase64] = useState(undefined);
  const { createValidation } = useService();

  const generateBase64 = file => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = function () {
      setBase64(btoa(reader.result));
    };
    reader.onerror = function () {
      setMessage("Ocorreu um problema ao subir o arquivo");
      setError(true);
    };
  };

  const validateFile = async e => {
    e.preventDefault();
    await createValidation(
      { fileId, base64, motivation },
      setError,
      setMessage,
      setLoading
    );
    setShowAlert(true);
  };
  return (
    <div className='container'>
      {error && error.message && (
        <div className='alert alert-danger' role='alert'>
          {error.message}
        </div>
      )}
      {loading ? (
        <div className='container'>
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      ) : (
        <Alert
          type={message !== "Arquivo é o mesmo!" ? "danger" : "success"}
          message={message}
          show={showAlert}
          setShow={setShowAlert}
        />
      )}
      <div className='row center-block'>
        <ValidationFormStyle
          className='text-center jumbotron'
          onSubmit={validateFile}
          noValidate
        >
          <h1>Valide os documentos</h1>
          <div className='form-group'>
            <label htmlFor='fileId' className='control-label'>
              Código do arquivo:
            </label>
            <input
              type='text'
              id='fileId'
              name='fileId'
              value={fileId}
              className='form-control'
              onChange={e => setFileId(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='fileId' className='control-label'>
              Motivação da validação:
            </label>
            <input
              type='text'
              id='fileId'
              name='fileId'
              value={motivation}
              className='form-control'
              onChange={e => setMotivation(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='file' className='control-label'>
              Arquivo:
            </label>
            <input
              type='file'
              id='file'
              name='file'
              onChange={e => {
                const file = e.target.files[0];
                generateBase64(file);
              }}
            />
          </div>
          <button className='btn btn-primary'>Validar</button>
        </ValidationFormStyle>
      </div>
    </div>
  );
};

const ValidationFormStyle = styled.form`
  display: block;
  margin: auto;
`;

export default ValidateDocument;
