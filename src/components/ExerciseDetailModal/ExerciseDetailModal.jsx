import React from "react";
import { Form, Modal, Row, Col } from "react-bootstrap";

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
                    <Row>
                        <Col xs lg="4">
                            <img
                                src={exercise.images[0].image}
                                alt="Imagen de ejercicio"
                                style={{ width: "150px", height: "150px" }}
                                title={exercise.name}
                                className="rounded"
                            />
                        </Col>
                        <Col>
                            <Form>
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
                                <Form.Group>
                                    <Form.Label className="text-primary-white">
                                        Dificultad
                                    </Form.Label>
                                    <Form.Control
                                        className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                                        defaultValue={exercise.dificulty}
                                        readOnly
                                    > 
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ExerciseDetailModal;