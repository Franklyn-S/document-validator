import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '../components/Card';
import AddIcon from '@material-ui/icons/Add';
import AddFileModal from '../components/Modals/AddFileModal';
import useService from '../hooks/useService';
import useAuth from '../hooks/useAuth';
import Alert from '../components/Alert';
import DeleteFileModal from '../components/Modals/DeleteFileModal';

const Documents = () => {
  const [selectedFile, setSelectedFile] = useState({});
  const [documents, setDocuments] = useState();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState('');
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const { getFilesByUser } = useService();
  const { getAuthenticatedUser } = useAuth();

  useEffect(() => {
    const userId = getAuthenticatedUser().pool.clientId;
    console.log(getAuthenticatedUser().pool.clientId);
    if ((!error && !documents) || shouldUpdate) {
      getFilesByUser(userId, setError, setDocuments, setShowAlert);
      setShouldUpdate(false);
    }
  }, [
    getFilesByUser,
    setDocuments,
    error,
    message,
    shouldUpdate,
    getAuthenticatedUser,
    documents,
  ]);

  return (
    <>
      <Alert
        type={error ? 'error' : 'success'}
        message={message}
        show={showAlert}
      />
      <div className="col-sm-6">
        <a href="#addFileModal" className="btn btn-success" data-toggle="modal">
          <AddIcon width={20} height={20} className="material-icons" />{' '}
          <span>Adicionar Arquivo</span>
        </a>
      </div>
      <div className="d-flex justify-content-start flex-wrap align-content-start">
        {documents &&
          documents.map(document => (
            <Card
              key={document.id}
              title={document.id}
              buttonName="Verificar Validações"
              url={`/document-validator/document/${document.id}`}
              buttonColor="btn-primary"
            >
              <a
                href="#deleteUserModal"
                className="delete"
                data-toggle="modal"
                onClick={() => setSelectedFile(document)}
              >
                <DeleteIcon
                  width={20}
                  height={20}
                  className="material-icons"
                  data-toggle="tooltip"
                  title="Deletar"
                />
              </a>
            </Card>
          ))}
        <AddFileModal
          id="addFileModal"
          error={error}
          setError={setError}
          setMessage={setMessage}
          setShowAlert={setShowAlert}
          setShouldUpdate={setShouldUpdate}
        />
        <DeleteFileModal
          id="addFileModal"
          fileId={selectedFile.FileId}
          error={error}
          setError={setError}
          setMessage={setMessage}
          setShowAlert={setShowAlert}
          setShouldUpdate={setShouldUpdate}
        />
      </div>
    </>
  );
};

export default Documents;
