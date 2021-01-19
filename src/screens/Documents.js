import React from 'react';
import Card from '../components/Card';

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
    </div>
  );
};

export default Documents;
