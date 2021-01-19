import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { validationService } from '../utils';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Card from '../components/Card';

const DocumentData = () => {
  const [validations, setValidations] = useState();
  const [error, setError] = useState(null);
  const { getAuthenticatedUser } = useAuth();
  const { id } = useParams();
  useEffect(() => {
    const getValidationsByDocumentId = () => {
      getAuthenticatedUser().getSession((err, session) => {
        if (err) {
          setError(err);
          return;
        }
        axios
          .get(validationService(id), {
            headers: {
              Authorization: session.getIdToken().getJwtToken(),
            },
          })
          .then(result => {
            console.log(result);
            setValidations(result.data);
          })
          .catch(err => setError(err));
      });
    };
    if (!error && !validations) {
      getValidationsByDocumentId();
    }
  }, [id, getAuthenticatedUser, error, validations]);
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
