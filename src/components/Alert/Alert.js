import React from "react";

const Alert = ({ type, message, show, setShow }) => {
  return (
    <div
      className={`container alert alert-${type} alert-dismissible fade ${
        show && "show"
      }`}
      role="alert"
    >
      <span
        onClick={() => setShow(false)}
        type="button"
        className="close"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </span>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
