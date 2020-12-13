import React from "react";
import "../ExerciseItem/exerciseItemStyles.scss";

const SearchExerciseItem = ({ exercise, handleSelectExercise }) => {
  return (
    <div
      className="search-container"
      onDoubleClick={() => handleSelectExercise(exercise)}
    >
      <div className="exercise-img-container">
        <img
          src={exercise.images[0].image}
          alt="Imagen de ejercicio"
          style={{ width: "50px", height: "50px" }}
          title={exercise.name}
          className="rounded"
        ></img>

        <div
          style={{
            marginLeft: "15px",
            wordWrap: "break-word",
          }}
        >
          {exercise.name.length <= 25
            ? exercise.name
            : exercise.name.substr(0, 25) + "..."}
        </div>
      </div>
    </div>
  );
};

export default SearchExerciseItem;
