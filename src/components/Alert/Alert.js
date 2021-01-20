import React from 'react';

const Alert = ({ type, message, show }) => {
  return (
    <div
      className={` container alert alert-${type} alert-dismissible fade ${show && 'show'}`}
      role="alert"
    >
      <span
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </span>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
