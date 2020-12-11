import React from "react";
import ExerciseItem from "../ExerciseItem/ExerciseItem";
import "./blockExercises.scss";
import { BiRepeat } from "@meronex/icons/bi";

const BlockExercises = (exercises) => {
  return (
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
        ></ExerciseItem>
      ))}
    </div>
  );
};

export default BlockExercises;
