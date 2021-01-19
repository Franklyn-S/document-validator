import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Card from '../components/Card';
import useService from '../hooks/useService';

const DocumentData = () => {
  const [validations, setValidations] = useState();
  const [error, setError] = useState(null);
  const { getAuthenticatedUser } = useAuth();
  const { getValidationsByDocumentId } = useService();
  const { id } = useParams();
  useEffect(() => {
    if (!error && !validations) {
      getValidationsByDocumentId(id, setError, setValidations);
    }
  }, [
    id,
    getAuthenticatedUser,
    error,
    validations,
    getValidationsByDocumentId,
  ]);
  console.log(validations);
  return (
    <div className="container d-flex justify-content-start flex-wrap align-content-start">
      {validations &&
        validations.map(validation => (
          <Card
            key={validation.validationId}
            title={validation.validationId}
            description={validation.motivation}
            buttonName={validation.result ? 'Successo' : 'Falhou'}
            buttonColor={validation.result ? 'btn-success' : 'btn-danger'}
            buttonDisabled={validation.result}
          />
        ))}
      {validations && validations.length === 0 && (
        <div className="alert alert-primary" role="alert">
          O arquivo não possui validações
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default DocumentData;
