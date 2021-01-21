import React, { useState } from "react";
import useService from "../../hooks/useService";
import $ from "jquery";

const AddFileModal = ({
  error,
  setError,
  setMessage,
  setShowAlert,
  setShouldUpdate,
  setLoading,
  userId,
}) => {
  const [file, setFile] = useState("");
  const [base64, setBase64] = useState("");
  const { postFile } = useService();

  const generateBase64 = file => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function () {
      setBase64(btoa(reader.result));
    };
    reader.onerror = function () {
      setError("Ocorreu um problema ao subir o arquivo");
    };
  };

  const addFile = async e => {
    e.preventDefault();
    console.log(file.name);
    await postFile(
      { UserId: userId, Filename: file.name, File: base64 },
      setError,
      setMessage,
      setShouldUpdate,
      setShowAlert,
      setLoading
    );
    $("#addModalCloseButton").click();
  };

  return (
    <div id="addFileModal" className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={addFile}>
            <div className="modal-header">
              <h4 className="modal-title">Adicionar Arquivo</h4>
              <button
                id="addModalCloseButton"
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
                onChange={async e => {
                  const file = e.target.files[0];
                  setFile(file);
                  await generateBase64(file);
                }}
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
