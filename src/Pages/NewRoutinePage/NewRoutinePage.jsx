import React, { useState } from "react";
import { useUser } from "../../context/user-context";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import {
  Container,
  Col,
  DropdownButton,
  Dropdown,
  Row,
  Form,
} from "react-bootstrap";
import { RiFireFill, RiTimeFill, RiAddFill } from "@meronex/icons/ri";
import ImagePicker from "../../components/ImagePicker/ImagePicker";
import BlockExercisesInput from "../../components/BlockExercises/BlockExercisesInput";
import DropDownItems from "../../components/DropDownItems/DropDownItems";
import * as constants from "../../constants/constants";
import { Button } from "react-bootstrap";
import "./newRoutineStyles.scss";

function ObjectBlock(id) {
  this.id = id;
  this.name = "";
  this.repetitions = 0;
  this.listExercises = [];
}

const NewRoutinePage = () => {
  const { user } = useUser();
  const { register, handleSubmit, errors } = useForm();
  const [difficulty, setDifficulty] = useState("Dificultad");
  const [muscleGroup, setMuscleGroup] = useState("Grupo muscular");
  const [exercisesBlocks, setExercisesBlocks] = useState([]);

  const deleteBlock = (idBlock) => {
    const listAux = exercisesBlocks.filter((block) => block.id != idBlock);
    setExercisesBlocks(listAux);
  };

  const addExerciseToBlockById = (idBlock, exercise) => {
    const listAux = exercisesBlocks.map((block) => {
      if (block.id == idBlock) block.listExercises.push(exercise);
      return block;
    });
    setExercisesBlocks(listAux);
  };

  const deleteExerciseFromBlock = (idBlock, idExercise) => {
    const listAux = exercisesBlocks.map((block) => {
      if (block.id == idBlock) {
        block.listExercises = block.listExercises.filter(
          (exercise) => exercise.id != idExercise
        );
      }
      return block;
    });
    setExercisesBlocks(listAux);
  };

  const handleSaveRoutine = async (data) => {
    console.log(data);
  };

  const showExercisesBlocksInput = () => {
    return (
      <div className="d-flex flex-column align-items-center">
        {exercisesBlocks.map((block, index) => (
          <BlockExercisesInput
            id={block.id}
            key={block.id}
            deleteBlock={deleteBlock}
            addExerciseToBlockById={addExerciseToBlockById}
            deleteExercise={deleteExerciseFromBlock}
            listExercises={block.listExercises}
          ></BlockExercisesInput>
        ))}
      </div>
    );
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handleSaveRoutine)}>
        <div
          className="text-primary-white mt-3 mb-3"
          style={{ borderBottom: "1px solid" }}
        >
          <h3>Información de la rutina</h3>
        </div>
        <Container className="mt-5">
          <Row>
            <Col xs lg="3">
              <ImagePicker
                defaultImage={user.cover}
                shape={"rounded"}
                width="175px"
                height="175px"
                register={register}
              ></ImagePicker>
            </Col>
            <Col>
              <Form.Row>
                <Col className="col-lg-6">
                  <Form.Group controlId="routineName">
                    <Form.Label className="text-primary-white">
                      Nombre de la rutina
                    </Form.Label>
                    <Form.Control
                      name="routineName"
                      placeholder="Ingrese el nombre de la rutina"
                      className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                      ref={register({
                        required: "Este campo es requerido",
                        maxLength: {
                          value: 50,
                          message: "Máximo número de caracteres alcanzado",
                        },
                        pattern: {
                          value: /[A-zÀ-ú]/,
                          message: "Nombre inválido",
                        },
                      })}
                    />
                    {errors.routine_name && (
                      <span className="text-danger">
                        {errors.routine_name.message}
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label className="text-primary-white">
                      Descripción
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      placeholder="Ingrese la descripción"
                      className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                      ref={register({
                        maxLength: {
                          value: 350,
                          message: "Máximo número de caracteres alcanzado",
                        },
                      })}
                    />
                    {errors.description && (
                      <span className="text-danger">
                        {errors.description.message}
                      </span>
                    )}
                  </Form.Group>
                  <DropdownButton
                    id="idDropDownMuscleGroup"
                    title={muscleGroup}
                    variant="primary-surface-8dp text-primary-white"
                  >
                    <Dropdown.ItemText style={{ opacity: "50%" }}>
                      Seleccionar grupo
                    </Dropdown.ItemText>
                    <DropDownItems
                      values={Object.values(constants.muscleGroups)}
                      setValue={setMuscleGroup}
                    ></DropDownItems>
                  </DropdownButton>
                </Col>
                <Col>
                  <div className="d-flex flex-column">
                    <div
                      className="d-inline-flex align-items-center col-lg-6"
                      style={{ marginTop: "2rem" }}
                    >
                      <RiFireFill
                        size="1.2rem"
                        className="text-primary-white mr-1"
                      ></RiFireFill>
                      <DropdownButton
                        id="idDropDownDifficult"
                        title={difficulty}
                        variant="primary-surface-8dp text-primary-white"
                      >
                        <Dropdown.ItemText style={{ opacity: "50%" }}>
                          Seleccionar dificultad
                        </Dropdown.ItemText>
                        <DropDownItems
                          values={Object.values(constants.routineDifficulties)}
                          setValue={setDifficulty}
                        ></DropDownItems>
                      </DropdownButton>
                    </div>

                    <div
                      className="d-inline-flex align-items-center col-lg-6"
                      style={{ marginTop: "1rem" }}
                    >
                      <RiTimeFill
                        size="1.2rem"
                        className="text-primary-white mr-1"
                      ></RiTimeFill>
                      <Form.Group
                        controlId="routineTime"
                        style={{ display: "contents" }}
                      >
                        <Form.Control
                          name="routineTime"
                          placeholder="Minutos"
                          className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                          style={{ maxWidth: "120px" }}
                          ref={register({
                            required: "Este campo es requerido",
                            maxLength: {
                              value: 50,
                              message: "Máximo número de caracteres alcanzado",
                            },
                            pattern: {
                              value: /[A-zÀ-ú]/,
                              message: "Duración inválida",
                            },
                          })}
                        />
                        {errors.routineTime && (
                          <span className="text-danger">
                            {errors.routineTime.message}
                          </span>
                        )}
                      </Form.Group>
                    </div>
                    <Form.Group
                      className="text-primary-white mt-2"
                      style={{ marginLeft: "1.1rem" }}
                    >
                      <Form.Check
                        name="checkBoxIsPublic"
                        type="checkbox"
                        label="Es pública"
                        ref={register}
                      />
                    </Form.Group>
                  </div>
                </Col>
              </Form.Row>
            </Col>
          </Row>
        </Container>
        <div
          className="text-primary-white mt-5"
          style={{ borderBottom: "1px solid", marginBottom: "2rem" }}
        >
          <h3>Ejercicios de la rutina</h3>
        </div>
        <div
          className="d-flex align-items-end flex-column"
          style={{ width: "90%" }}
        >
          <Button
            variant="primary-surface-8dp text-primary-white mb-5"
            onClick={() => {
              setExercisesBlocks([
                ...exercisesBlocks,
                new ObjectBlock(nanoid()),
              ]);
            }}
          >
            <span className="d-flex align-items-center">
              <RiAddFill size="2rem"></RiAddFill>
              Agregar bloque
            </span>
          </Button>
        </div>
        {showExercisesBlocksInput()}
      </Form>
    </>
  );
};

export default NewRoutinePage;
