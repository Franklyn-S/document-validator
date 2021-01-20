import React from 'react';
import styled from 'styled-components';

const Card = ({
  title,
  description,
  buttonName,
  url,
  buttonDisabled,
  buttonColor,
  children
}) => {
  return (
    <CardContainer className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {children}
        <p className="card-text">{description}</p>
        {buttonName &&
          (buttonDisabled ? (
            <p style={{ cursor: 'default' }} className={`btn ${buttonColor}`}>
              {buttonName}
            </p>
          ) : (
            <a className={`btn ${buttonColor}`} href={url}>
              {buttonName}
            </a>
          ))}
      </div>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  width: 18rem;
  margin: 15px;
`;
