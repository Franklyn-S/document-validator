import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Card from '../components/Card';
import AddFileModal from '../components/Modals/AddFileModal';
import useService from '../hooks/useService';
import useAuth from '../hooks/useAuth';
import Alert from '../components/Alert';
import DeleteFileModal from '../components/Modals/DeleteFileModal';
import { bucketS3 } from '../services';

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
              title={document.name}
              buttonName="Verificar Validações"
              url={`/document-validator/document/${document.id}`}
              buttonColor="btn-primary"
            >
              <a
                download={document.name}
                title={document.name}
                href={bucketS3 + document.path}
                className="delete"
                data-toggle="modal"
              >
                <CloudDownloadIcon
                  width={20}
                  height={20}
                  className="material-icons"
                  data-toggle="tooltip"
                  title="Baixar"
                />
              </a>
              <a
                href="#deleteFileModal"
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

const ButtonLink = styled.button`
  background: none !important;
  border: none;
  padding: 0 !important;
  /*optional*/
  font-family: arial, sans-serif;
  /*input has OS specific font-family*/
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
`;
