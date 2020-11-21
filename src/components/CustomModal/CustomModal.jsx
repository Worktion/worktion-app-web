import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./modalStyles.scss";

const CustomModal = ({ active, title, body, handleAccept, handleClose }) => {
  return (
    <>
      <Modal className="text-primary-white" show={active} onHide={handleClose}>
        <Modal.Header className="bg-primary-black" closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-primary-black">{body}</Modal.Body>
        <Modal.Footer className="bg-primary-black">
          <Button variant="outline-danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="outline-success" onClick={handleAccept}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;
