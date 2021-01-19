import React from 'react';
import Card from '../components/Card';
import AddIcon from '@material-ui/icons/Add';
import AddFileModal from '../components/Modals/AddFileModal';

const Documents = () => {
  const documents = [
    {
      id: 'das021',
      userid: 'dksadsabk',
      path: 'dsadsaddssaasd',
      hash: 'dsadwqewqe',
    },
    {
      id: 'test 2',
      userid: 'dksadsabk',
      path: 'dsadsaddssaasd',
      hash: 'dsadwqewqe',
    },
    {
      id: 'test 3',
      userid: 'dksadsabk',
      path: 'dsadsaddssaasd',
      hash: 'dsadwqewqe',
    },
  ];
  return (
    <>
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
            />
          ))}
        <AddFileModal id="addFileModal" />
      </div>
    </>
  );
};

export default Documents;
