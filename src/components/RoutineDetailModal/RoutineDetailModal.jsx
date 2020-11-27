import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./routineDetailModalStyles.scss";
import BlockExercises from "../BlockExercises/BlockExercises";

const RoutineDetailModal = ({ show, handleClose, routine }) => {
  return (
    <>
      <Modal
        id="routine-modal"
        show={show}
        onHide={handleClose}
        dialogClassName="modal-routine-detail"
        className="text-primary-white"
      >
        <Modal.Header closeButton>
          <Modal.Title>{routine.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="display-flex justify-content-center px-5 pt-1 pb-5">
        
          {routine.blocks &&
            routine.blocks.map((block) => (
              <BlockExercises
                block={block}
              ></BlockExercises>
            ))}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RoutineDetailModal;
