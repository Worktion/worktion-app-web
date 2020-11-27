import React from "react";
import "./exerciseItemStyles.scss";
import { Dropdown, DropdownButton } from "react-bootstrap";
import styled from "styled-components";

const StyledDropDownButton = styled(DropdownButton)`
  &:hover {
    box-shadow: 0 0 0 0.3px grey;
    border-radius: 30%;
  }
`;

const ExerciseItem = ({ executionExercise }) => {
  console.log(executionExercise);
  return (
    <div className="exercise-container">
      <div>{executionExercise.quantity + " repeticiones"}</div>

      <div className="exercise-img-container">
        <img
          src={executionExercise.exercise.images[0].image}
          alt="Imagen de ejercicio"
          style={{ width: "70px", height: "70px" }}
          title={executionExercise.exercise.name}
        ></img>

        <div style={{ maxWidth: "60px" }}>
          {executionExercise.exercise.name}
        </div>
      </div>
      <div>
        <StyledDropDownButton
          className="ml-auto"
          id="dropdownRoutineOptions"
          title=""
          variant="transparent text-primary-white border-0 btn-toogle-down"
        >
          <Dropdown.Item>Ver información de ejercicio</Dropdown.Item>
        </StyledDropDownButton>
      </div>
    </div>
  );
};

export default ExerciseItem;
