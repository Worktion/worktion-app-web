import React from "react";
import { Alert } from "react-bootstrap";

function CustomAlert({ content, closeError, variant }) {
  if (!content) {
    return null;
  }
  return (
    <Alert variant={variant} onClose={() => closeError()} dismissible>
      {content}
    </Alert>
  );
}

export default CustomAlert;
