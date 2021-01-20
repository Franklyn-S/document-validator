import React, { useState } from 'react';

const AddFileModal = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');

  const addFile = e => {
    e.preventDefault();
    console.log(file);
    const reader = new FileReader();
    if (file) {
      console.log(reader.readAsDataURL(file));
    }
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
