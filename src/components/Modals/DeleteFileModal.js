import React from "react";
import useService from "../../hooks/useService";
import $ from "jquery";

const DeleteFileModal = ({
  fileId,
  error,
  setError,
  setMessage,
  setShowAlert,
  setShouldUpdate,
  setLoading,
}) => {
  const { deleteFile } = useService();
  const handleDelete = e => {
    e.preventDefault();
    deleteFile(
      fileId,
      setError,
      setMessage,
      setShouldUpdate,
      setShowAlert,
      setLoading
    );
    setShowAlert(true);
    $("#deleteModalCloseButton").click();
  };
  return (
    <div id='deleteFileModal' className='modal fade'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <form onSubmit={handleDelete}>
            <div className='modal-header'>
              <h4 className='modal-title'>Deletar Arquivo</h4>
              <button
                id='deleteModalCloseButton'
                type='button'
                className='close'
                data-dismiss='modal'
                aria-hidden='true'
              >
                &times;
              </button>
            </div>
            <div className='modal-body'>
              <p>Você tem certeza que quer deletar esse arquivo?</p>
              <p className='text-warning'>
                <small>Essa ação não pode ser desfeita.</small>
              </p>
            </div>
            <div className='modal-footer'>
              <input
                type='button'
                className='btn btn-default'
                data-dismiss='modal'
                value='Cancelar'
              />
              <input type='submit' className='btn btn-danger' value='Deletar' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteFileModal;
