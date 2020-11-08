import React from "react";
import Button from "react-bootstrap/Button";

function PrimaryButton({ content }) {
  return (
    <Button variant="outline-primary border-2 bg-primary text-white" size="lg">
      {content}
    </Button>
  );
}

export default PrimaryButton;
