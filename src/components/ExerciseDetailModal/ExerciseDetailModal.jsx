import React from "react";
import { Form, Modal, Row, Col } from "react-bootstrap";
import * as constants from "../../constants/constants"

const ExerciseDetailModal = ({ show, handleClose, exercise }) => {
    return (
        <>
            <Modal
                id="exercise-modal"
                show={show}
                onHide={handleClose}
                dialogClassName="modal-exercise-detail"
                className="text-primary-white">

                <Modal.Header closeButton>
                    <Modal.Title>{exercise.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Row>
                            <Col xs="auto">
                                <img
                                    src={exercise.images[0].image}
                                    alt="Imagen de ejercicio"
                                    style={{ width: "170px", height: "170px" }}
                                    title={exercise.name}
                                    
                                />
                            </Col>
                            <Col xs="auto">
                                <Form.Group>
                                    <Form.Label className="text-primary-white">
                                        Nombre
                                    </Form.Label>
                                    <Form.Control
                                        className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                                        defaultValue={exercise.name}
                                        readOnly
                                    >
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="text-primary-white">
                                        Nombres similares
                                    </Form.Label>
                                    <Form.Control
                                        className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                                        defaultValue={exercise.similar_names}
                                        readOnly
                                    >
                                    </Form.Control>
                                </Form.Group>

                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label className="text-primary-white">
                                Dificultad
                                    </Form.Label>
                            <Form.Control
                                className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                                readOnly
                                defaultValue={
                                    constants.routineDifficulties[
                                    exercise.dificulty
                                    ]
                                }
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="text-primary-white">
                                Descripción
                                    </Form.Label>
                            <Form.Control
                                as="textarea"
                                className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                                defaultValue={exercise.description}
                                readOnly
                            >
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ExerciseDetailModal;