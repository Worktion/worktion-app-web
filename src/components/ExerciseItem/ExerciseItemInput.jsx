import React, { useState } from "react";
import { EnCross } from "@meronex/icons/en";
import "./exerciseItemStyles.scss";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import * as constants from "../../constants/constants";
import DropDownItems from "../DropDownItems/DropDownItems";
import { useRoutine } from "../../context/routine-context";

const ExerciseItemInput = ({ idBlock, exercise, deleteExercise }) => {
  const { addInfoToExercise } = useRoutine();
  const [executionType, setExecutionType] = useState("Repeticiones");
  const [quantity, setQuantity] = useState(1);

  addInfoToExercise(idBlock, exercise.id, quantity, executionType);

  return (
    <div className="exercise-container">
      <div
        className="d-flex text-align-center"
        style={{ flex: "1.3", marginLeft: "3rem" }}
      >
        <Form.Group controlId="inputQuantity" style={{ display: "contents" }}>
          <Form.Control
            name="inputQuantity"
            defaultValue="1"
            type="number"
            min="1"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            className="bg-primary-surface-8dp text-primary-white border-0 pl-2 mr-2"
            style={{ maxWidth: "4rem" }}
          />
        </Form.Group>
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
      </div>

      <div className="exercise-img-container ml-2">
        <img
          src={exercise.images[0].image}
          alt="Imagen de ejercicio"
          style={{ width: "70px", height: "70px" }}
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
      <EnCross
        className="text-primary-white delete-button "
        size="1.5rem"
        onClick={() => {
          deleteExercise(idBlock, exercise.id);
        }}
        style={{ marginRight: "-10px", marginTop: "-65px" }}
      ></EnCross>
    </div>
  );
};

export default ExerciseItemInput;
