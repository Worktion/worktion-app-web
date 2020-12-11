import React from "react";
import "./exerciseItemStyles.scss";
import { Dropdown, DropdownButton } from "react-bootstrap";

const ExerciseItemInput = ({ exercise }) => {
  return (
    <div className="exercise-container">
      {/* <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
        {executionExercise.quantity + " repeticiones"}
      </div> */}

      <div className="exercise-img-container">
        {/* <img
          src={exercise.images[0].image}
          alt="Imagen de ejercicio"
          style={{ width: "70px", height: "70px" }}
          title={exercise.name}
        ></img> */}

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
      <div style={{flex: ".3"}} >
        <DropdownButton
          className="ml-auto"
          id="dropDownExercise"
          title=""
          variant="transparent text-primary-white border-0 btn-toogle-down"
        >
          <Dropdown.Item>Ver información de ejercicio</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
};

export default ExerciseItemInput;
