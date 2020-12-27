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
import { useRoutine, RoutineProvider } from "../../context/routine-context";
import CustomAlert from "../../components/Alert/CustomAlert";

function ObjectBlock(id) {
  this.id = id;
  this.name = "";
  this.repetitions = 0;
  this.listExercises = [];
}

const NewRoutinePage = () => {
  const { user } = useUser();
  const {
    addBlock,
    deleteBlockFromRoutine,
    addExerciseToBlock,
    deleteExercise,
    addInfoToRoutine,
    saveRoutine,
    isRoutineValid,
  } = useRoutine();
  const { register, handleSubmit, errors } = useForm();
  const [difficulty, setDifficulty] = useState("Dificultad");
  const [muscleGroup, setMuscleGroup] = useState("Grupo muscular");
  const [exercisesBlocks, setExercisesBlocks] = useState([]);
  const [error, setError] = useState(null);

  const addBlockToRoutine = () => {
    const block = new ObjectBlock(nanoid());
    addBlock(block.id);
    setExercisesBlocks([...exercisesBlocks, block]);
  };

  const deleteBlock = (idBlock) => {
    const listAux = exercisesBlocks.filter((block) => block.id != idBlock);
    deleteBlockFromRoutine(idBlock);
    setExercisesBlocks(listAux);
  };

  const addExerciseToBlockById = (idBlock, exercise) => {
    const listAux = exercisesBlocks.map((block) => {
      if (block.id == idBlock) block.listExercises.push(exercise);
      return block;
    });
    addExerciseToBlock(idBlock, exercise);
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
    deleteExercise(idBlock, idExercise);
    setExercisesBlocks(listAux);
  };

  const handleSaveRoutine = async (data) => {
    addInfoToRoutine(data, muscleGroup, difficulty);
    const message = isRoutineValid();
    if (true === message) {
      saveRoutine();
    } else {
      setError(message);
    }
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
      <CustomAlert
        variant={"danger"}
        content={error}
        closeError={() => {
          setError(null);
        }}
      ></CustomAlert>
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
                      maxLength="50"
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
                    {errors.routineName && (
                      <span className="text-danger">
                        {errors.routineName.message}
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
                      maxLength="350"
                      ref={register({
                        required: "Este campo es requerido",
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
                  {errors.description && (
                    <span className="text-danger">
                      {errors.description.message}
                    </span>
                  )}
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
                        style={{ alignSelf: "flex-start", marginTop: "0.6rem" }}
                      ></RiFireFill>
                      <div className="d-flex flex-column">
                        <DropdownButton
                          id="idDropDownDifficult"
                          title={difficulty}
                          variant="primary-surface-8dp text-primary-white"
                        >
                          <Dropdown.ItemText style={{ opacity: "50%" }}>
                            Seleccionar dificultad
                          </Dropdown.ItemText>
                          <DropDownItems
                            values={Object.values(
                              constants.routineDifficulties
                            )}
                            setValue={setDifficulty}
                          ></DropDownItems>
                        </DropdownButton>
                        {errors.description && (
                          <span className="text-danger">
                            {errors.description.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className="d-inline-flex align-items-center col-lg-6"
                      style={{ marginTop: "1rem" }}
                    >
                      <RiTimeFill
                        size="1.2rem"
                        className="text-primary-white mr-1"
                        style={{ alignSelf: "flex-start", marginTop: "0.6rem" }}
                      ></RiTimeFill>
                      <Form.Group
                        controlId="routineTime"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Form.Control
                          name="routineTime"
                          placeholder="Minutos"
                          type="number"
                          maxLength="6"
                          className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                          style={{ maxWidth: "120px" }}
                          ref={register({
                            required: "Este campo es requerido",
                            maxLength: {
                              value: 50,
                              message: "Máximo número de caracteres alcanzado",
                            },
                            pattern: {
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
            onClick={addBlockToRoutine}
          >
            <span className="d-flex align-items-center">
              <RiAddFill size="2rem"></RiAddFill>
              Agregar bloque
            </span>
          </Button>
        </div>
        {showExercisesBlocksInput()}
        <div>
          <Button className="w-50" variant="outline-success" type="submit">
            Guardar
          </Button>
        </div>
      </Form>
    </>
  );
};

export default () => (
  <RoutineProvider>
    <NewRoutinePage></NewRoutinePage>
  </RoutineProvider>
);
