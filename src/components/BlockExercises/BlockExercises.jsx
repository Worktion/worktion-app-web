import React, {useState} from "react";
import ExerciseItem from "../ExerciseItem/ExerciseItem";
import "./blockExercises.scss";
import { BiRepeat } from "@meronex/icons/bi";
import ExerciseDetailModal from "../ExerciseDetailModal/ExerciseDetailModal"


const BlockExercises = (exercises) => {
  const [showDetailExercise, setShowDetailExercise] = useState(null);


  const closeDetailExercise = () => {
    setShowDetailExercise(false);
  };

  const showExercise = (exercise) => {
    setShowDetailExercise(exercise);
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
    <div className="block-exercises" style={{ borderRadius: "15px"}}>
      <div className="header-block">
        <span>{exercises.block.name}</span>
        <span>
          {exercises.block.quantity}
          <BiRepeat size="2.3rem"></BiRepeat>
        </span>
      </div>
      {exercises.block.exercises.map((exercise) => (
        <ExerciseItem
          key={exercise.id}
          executionExercise={exercise}
          handleShowExerciseDetail={showExercise}
        ></ExerciseItem>
      ))}
    </div>

    </>
  );
};

export default BlockExercises;
