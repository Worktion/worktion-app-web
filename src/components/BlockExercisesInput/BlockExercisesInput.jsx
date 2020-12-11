import React from "react";
import ExerciseItem from "../ExerciseItem/ExerciseItem";
import { Form } from "react-bootstrap";

import { BiRepeat } from "@meronex/icons/bi";

const BlockExercisesInput = (exercises) => {
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

      </div>
      <h1 className="text-primary-white">Agrega un ejercicio...</h1>
      {/* {exercises.block.exercises.map((exercise) => (
        <ExerciseItem
          key={exercise.id}
          executionExercise={exercise}
        ></ExerciseItem>
      ))} */}
    </div>
  );
};

export default BlockExercisesInput;
