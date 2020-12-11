import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Modal,InputGroup, FormControl } from "react-bootstrap";
import SearchExerciseItem from "./SearchExerciseItem"

const SearchExerciseModal = () => {
    const [mShow, setShow] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        fecthExercises();
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
        fecthExercises();
    }
    const fecthExercises = async () => {
      const {data} = await Axios.get("/api/exercises?search=" + query);
        setExercises(data);
    };

    const printExercise = exercise =>{
        console.log("Click: " + exercise.name);
        setShow(false);
    }

    return (
        <>
            <Button onClick={handleShow}>Ejercicios</Button>

            <Modal 
                size="m"
                centered
                show={mShow} 
                onHide={handleClose}
                dialogClassName="modal-search-exercise"
                className="text-primary-white">
                <Modal.Header closeButton>
                    <Modal.Title className="" >Ejercicios</Modal.Title>
                </Modal.Header>
                <Modal.Body className="">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Buscar</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    placeholder="Pull up..."    
                    value={query}
                    onChange={handleChange}
                    />
                </InputGroup>
                <div
                    style={{ height: "230px" }}
                    className="container overflow-auto"
                >
                    {exercises.map((exercise) => (
                        <SearchExerciseItem
                            key={exercise.id}
                            exercise={exercise}
                            handleSelectExercise={printExercise}
                        ></SearchExerciseItem>
                    ))}
                </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SearchExerciseModal;
