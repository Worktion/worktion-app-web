import React, { useState } from "react";
import "./exerciseItemStyles.scss";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import * as constants from "../../constants/constants";
import DropDownItems from "../DropDownItems/DropDownItems";

const ExerciseItemInput = ({ exercise }) => {
  const [executionType, setExecutionType] = useState("Repeticiones");

  return (
    <div className="exercise-container">
      <div
        className="d-flex text-align-center"
        style={{ flex: "1", marginLeft: "3rem" }}
      >
        <DropdownButton
          id="idDropDownExecutionType"
          title={executionType}
          variant="primary-surface-8dp text-primary-white"
        >
          <Dropdown.ItemText style={{ opacity: "50%" }}>
            Seleccionar tipo
          </Dropdown.ItemText>
          <DropDownItems
            values={Object.values(constants.executionTypes)}
            setValue={setExecutionType}
          ></DropDownItems>
        </DropdownButton>
        <Form.Group controlId="routineTime" style={{ display: "contents" }}>
          <Form.Control
            name="inputTime"
            placeholder="0"
            className="bg-primary-surface-8dp text-primary-white border-0 pl-2 ml-2"
            style={{ maxWidth: "3.5rem" }}
          />
        </Form.Group>
      </div>

      <div className="exercise-img-container ml-2">
        <img
          src={exercise.images[0].image}
          alt="Imagen de ejercicio"
          style={{ width: "70px", height: "70px" }}
          title={exercise.name}
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
      <div style={{ flex: ".3" }}>
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
