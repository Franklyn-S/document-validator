import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Card from "../components/Card";
import AddFileModal from "../components/Modals/AddFileModal";
import useService from "../hooks/useService";
import Alert from "../components/Alert";
import DeleteFileModal from "../components/Modals/DeleteFileModal";
import UserContext from "../context/UserContext";
import { Input } from "@material-ui/core";

const Documents = () => {
  const [selectedFile, setSelectedFile] = useState({});
  const [documents, setDocuments] = useState(null);
  const [userId, setUserId] = useState();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState("");
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getFilesByUser } = useService();
  const { signedInUser } = useContext(UserContext);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if ((!error && !documents) || shouldUpdate) {
      const userId = signedInUser?.userId;
      setUserId(userId);
      getFilesByUser(
        userId,
        setError,
        setDocuments,
        setMessage,
        setShowAlert,
        setLoading
      );
      setShouldUpdate(false);
    }
  }, [
    getFilesByUser,
    setDocuments,
    error,
    message,
    shouldUpdate,
    signedInUser,
    documents,
  ]);
  return (
    <>
      {loading ? (
        <div className='container'>
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      ) : (
        <Alert
          type={error ? "danger" : "success"}
          message={message}
          show={showAlert}
          setShow={setShowAlert}
        />
      )}
      <div className='col-sm-6'>
        <a href='#addFileModal' className='btn btn-success' data-toggle='modal'>
          <AddIcon width={20} height={20} className='material-icons' />{" "}
          <span>Adicionar Arquivo</span>
        </a>
        <Input
          style={{ marginLeft: "10px" }}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Pesquise seus documentos'
        />
      </div>
      <div className='d-flex justify-content-start flex-wrap align-content-start'>
        {documents &&
          documents.map(document => {
            if (
              document.name.toLowerCase().includes(search) ||
              ("" + document.id).includes(search)
            ) {
              return (
                <Card
                  key={document.id}
                  id={document.id}
                  title={document.name}
                  buttonName='Verificar Validações'
                  url={`/document-validator/document/${document.id}`}
                  buttonColor='btn-primary'
                >
                  <ButtonLink
                    download={document.name}
                    title={document.name}
                    onClick={() => window.open(document.url)}
                    rel='noreferrer noopener'
                    className='delete'
                    data-toggle='modal'
                  >
                    <CloudDownloadIcon
                      width={20}
                      height={20}
                      className='material-icons'
                      data-toggle='tooltip'
                      title='Baixar'
                    />
                  </ButtonLink>
                  <a
                    href='#deleteFileModal'
                    className='delete'
                    data-toggle='modal'
                    onClick={() => setSelectedFile(document)}
                  >
                    <DeleteIcon
                      width={20}
                      height={20}
                      className='material-icons'
                      data-toggle='tooltip'
                      title='Deletar'
                    />
                  </a>
                </Card>
              );
            }
            return null;
          })}
        <AddFileModal
          id='addFileModal'
          error={error}
          setError={setError}
          setMessage={setMessage}
          setShowAlert={setShowAlert}
          setShouldUpdate={setShouldUpdate}
          setLoading={setLoading}
          userId={userId}
        />
        <DeleteFileModal
          id='addFileModal'
          fileId={selectedFile.id}
          error={error}
          setError={setError}
          setMessage={setMessage}
          setShowAlert={setShowAlert}
          setShouldUpdate={setShouldUpdate}
          setLoading={setLoading}
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
