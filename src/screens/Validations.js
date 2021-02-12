import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import useService from "../hooks/useService";
import UserContext from "../context/UserContext";

const DocumentData = () => {
  const [validations, setValidations] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { signedInUser } = useContext(UserContext);

  const { getValidationsByDocumentId } = useService();
  const { id } = useParams();
  useEffect(() => {
    if (!error && !validations) {
      getValidationsByDocumentId(id, setError, setValidations, setLoading);
    }
  }, [id, signedInUser, error, validations, getValidationsByDocumentId]);
  return (
    <div className='container d-flex justify-content-start flex-wrap align-content-start'>
      {validations &&
        validations.map(validation => (
          <Card
            key={validation.date}
            title={new Date(Date.parse(validation.date)).toLocaleString()}
            description={"Motivação: " + validation.motivation}
            buttonName={validation.result ? "Successo" : "Falhou"}
            buttonColor={validation.result ? "btn-success" : "btn-danger"}
            buttonDisabled={validation.result}
          />
        ))}
      {validations && validations.length === 0 && (
        <div className='alert alert-primary' role='alert'>
          O arquivo não possui validações
        </div>
      )}
      {error && (
        <div className='alert alert-danger' role='alert'>
          {error.message}
        </div>
      )}
      {loading && (
        <div className='spinner-border' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default DocumentData;
