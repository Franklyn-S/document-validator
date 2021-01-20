import React, { useState } from 'react';

const AddFileModal = ({
  error,
  setError,
  setMessage,
  setShowAlert,
  setShouldUpdate,
}) => {
  const [file, setFile] = useState('');
  const [base64, setBase64] = useState('');
  const [fileName, setFileName] = useState('');

  const generateBase64 = file => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = function () {
      setBase64(btoa(reader.result));
      console.log();
    };
    reader.onerror = function () {
      setError('Ocorreu um problema ao subir o arquivo');
    };
  };

  const addFile = e => {
    e.preventDefault();
    generateBase64(file);
    setFileName(file.name);
  };

  return (
    <div id="addFileModal" className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={addFile}>
            <div className="modal-header">
              <h4 className="modal-title">Adicionar Arquivo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div className="form-group">
              <label>Arquivo:</label>
              <input
                className="form-control"
                type="file"
                id="file"
                name="file"
                onChange={e => setFile(e.target.files[0])}
                required
              />
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
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFileModal;
