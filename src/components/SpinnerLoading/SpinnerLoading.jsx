import React from "react";
import { Spinner, Container } from "react-bootstrap";

const SpinnerLoading = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <Container
      style={style}
      className="d-flex justify-content-center align-items-center "
    >
      <Spinner animation="border"></Spinner>
    </Container>
  );
};

export default SpinnerLoading;
