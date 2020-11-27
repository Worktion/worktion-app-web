import React from "react";
import ExerciseItem from "../ExerciseItem/ExerciseItem";
import "./blockExercises.scss";

const BlockExercises = (exercises) => {
  return (
    <div className="block-exercises">
      <div className="header-block">
        <span>{exercises.block.name}</span> <span>{exercises.block.quantity} Repeticiones</span>
      </div>
      {exercises.block.exercises.map((exercise) => (
        <ExerciseItem executionExercise={exercise}></ExerciseItem>
      ))}
    </div>
  );
};

export default BlockExercises;
