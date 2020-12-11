import React, {useState} from "react";
import ExerciseItemInput from "../ExerciseItem/ExerciseItemInput";
import SearchExerciseModal from "../SearchExerciseModal/SearchExerciseModal"
import { Form } from "react-bootstrap";

const BlockExercisesInput = (exercises) => {

  const [listExercises, setListExercises] = useState([]);

  const addExerciseToBlock = exercise =>{
    console.log(exercise);
    setListExercises([...listExercises, exercise]);
    //setListExercises(exercise);
    console.log(listExercises);
  }
  return (
    <div
      className="block-exercises"
      style={{ borderRadius: "15px", width: "70%" }}
    >
      <div className="header-block header-block-input">
        <Form.Group controlId="blockName" className="form-inline m-2 align-items-center">
          <Form.Label className="text-primary-white m-2">
            Nombre del bloque
          </Form.Label>
          <Form.Control
            name="routineNameControl"
            placeholder="Ingrese el nombre"
            className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
            style={{ maxWidth: "13rem", height: "2rem" }}
          />
        </Form.Group>
        
        <Form.Group controlId="blockRep" className="form-inline m-2 align-items-center" >
          <Form.Label className="text-primary-white mr-2">
            Repeticiones
          </Form.Label>
          <Form.Control
            name="blockRepControl"
            placeholder="Cantidad"
            className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
            style={{ maxWidth: "6rem", height: "2rem" }}
          />
        </Form.Group>
        <SearchExerciseModal
          handleAddExercise={addExerciseToBlock}
        >

        </SearchExerciseModal>

      </div>
      <h1 className="text-primary-white">Agrega un ejercicio...</h1>
      {/* {listExercises.map((exercise) => (
        <ExerciseItemInput
          key={exercise.id}
          executionExercise={exercise}
        ></ExerciseItemInput>
      ))} */}
    </div>
  );
};

export default BlockExercisesInput;
