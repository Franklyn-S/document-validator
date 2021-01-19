import React, { useState } from 'react';
import styled from 'styled-components';

const ValidateDocument = () => {
  const [fileId, setFileId] = useState('');
  const [file, setFile] = useState(undefined);
  const validateFile = e => {
    e.preventDefault();
    console.log(file);
  };
  return (
    <div className="container">
      <div className="row center-block">
        <ValidationFormStyle
          className="text-center jumbotron"
          onSubmit={validateFile}
          noValidate
        >
          <h1>Valide os documentos</h1>
          <div className="form-group">
            <label htmlFor="fileId" className="control-label">
              Código do arquivo:
            </label>
            <input
              type="text"
              id="fileId"
              name="fileId"
              value={fileId}
              className="form-control"
              onChange={e => setFileId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="file" className="control-label">
              Arquivo:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={e => setFile(e.target.files[0])}
            />
          </div>
          <button className="btn btn-primary">Validar</button>
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
