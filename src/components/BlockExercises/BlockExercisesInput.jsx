import React, { useState } from "react";
import { EnCross } from "@meronex/icons/en";
import ExerciseItemInput from "../ExerciseItem/ExerciseItemInput";
import SearchExerciseModal from "../SearchExerciseModal/SearchExerciseModal";
import { Form } from "react-bootstrap";
import { useRoutine } from "../../context/routine-context";
import ExerciseDetailModal from "../ExerciseDetailModal/ExerciseDetailModal";

const BlockExercisesInput = ({
  id,
  deleteBlock,
  addExerciseToBlockById,
  listExercises,
  deleteExercise,
}) => {
  const { addInfoToBlock } = useRoutine();
  const [state, setState] = useState({ nameBlock: "", repetitions: 0 });
  const [showDetailExercise, setShowDetailExercise] = useState(null);

  const closeDetailExercise = () => {
    setShowDetailExercise(false);
  };

  const showExercise = (exercise) => {
    setShowDetailExercise(exercise);
  };

  addInfoToBlock(id, state.nameBlock, state.repetitions);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  return (
    <>
      {showDetailExercise && (
        <ExerciseDetailModal
          show={showDetailExercise ? true : false}
          handleClose={closeDetailExercise}
          exercise={showDetailExercise ? showDetailExercise : null}
        ></ExerciseDetailModal>
      )}
      <div
        className="block-exercises"
        style={{ borderRadius: "15px", width: "70%" }}
      >
        <div className="header-block header-block-input">
          <Form.Group className="form-inline m-2 align-items-center">
            <Form.Label className="text-primary-white m-2">
              Nombre del bloque
            </Form.Label>
            <Form.Control
              id="nameBlock"
              placeholder="Ingrese el nombre"
              className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
              onChange={handleChange}
              maxLength="50"
              style={{ maxWidth: "13rem", height: "2rem" }}
            />
          </Form.Group>

          <Form.Group className="form-inline m-2 align-items-center">
            <Form.Label className="text-primary-white mr-2">
              Repeticiones
            </Form.Label>
            <Form.Control
              id="repetitions"
              type="number"
              min="1"
              max="15"
              className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
              onChange={handleChange}
              style={{ maxWidth: "6rem", height: "2rem" }}
            />
          </Form.Group>
          <SearchExerciseModal
            handleAddExercise={addExerciseToBlockById}
            idBlock={id}
          ></SearchExerciseModal>
          <EnCross
            className="delete-button"
            onClick={() => {
              deleteBlock(id);
            }}
            size="1.5rem"
            style={{ marginLeft: "auto", marginBottom: "auto" }}
          ></EnCross>
        </div>
        {listExercises.map((exercise) => (
          <ExerciseItemInput
            idBlock={id}
            key={exercise.id}
            exercise={exercise}
            deleteExercise={deleteExercise}
            handleShowExerciseDetail={showExercise}
          ></ExerciseItemInput>
        ))}
      </div>
    </>
  );
};

export default BlockExercisesInput;
