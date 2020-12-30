import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import SearchExerciseItem from "./SearchExerciseItem";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";

const SearchExerciseModal = ({ idBlock, handleAddExercise }) => {
  const [mShow, setShow] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    fecthExercises();
  }, [query]);

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    setIsLoading(true);
  };

  const fecthExercises = async () => {
    const { data } = await Axios.get("/api/exercises?search=" + query);
    setExercises(data);
    setIsLoading(false);
  };

  const sendExercise = (exercise) => {
    handleAddExercise(idBlock, exercise);
    setShow(false);
  };

  return (
    <>
      <Button
        variant="primary-surface-8dp text-primary-white"
        onClick={handleShow}
      >
        Agregar Ejercicio
      </Button>

      <Modal
        size="m"
        centered
        show={mShow}
        onHide={handleClose}
        dialogClassName="modal-search-exercise"
        className="text-primary-white"
      >
        <Modal.Header closeButton>
          <Modal.Title className="">Ejercicios</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Buscar</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Pull up..."
              value={query ? query : ""}
              onChange={handleChange}
            />
          </InputGroup>
          <div style={{ height: "230px" }} className="container overflow-auto">
            {isLoading ? (
              <SpinnerLoading></SpinnerLoading>
            ) : (
              exercises.map((exercise) => (
                <SearchExerciseItem
                  key={exercise.id}
                  exercise={exercise}
                  handleSelectExercise={sendExercise}
                ></SearchExerciseItem>
              ))
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SearchExerciseModal;
