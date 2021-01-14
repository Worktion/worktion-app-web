import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
import CustomModal from "../../components/CustomModal/CustomModal";
import defaultRoutineImage from "../../images/defaultRoutineImage.jpg";

function ObjectBlock(id) {
  this.id = id;
  this.name = "";
  this.repetitions = 0;
  this.listExercises = [];
}

const initialState = {
  difficult: "Dificultad",
  muscleGroup: "Grupo muscular",
  error: { content: null, variant: null },
  customModalData: null,
};

const NewRoutinePage = () => {
  const {
    addBlock,
    deleteBlockFromRoutine,
    addExerciseToBlock,
    deleteExercise,
    addInfoToRoutine,
    saveRoutine,
    isRoutineValid,
    resetContext,
  } = useRoutine();
  const { register, handleSubmit, errors } = useForm();
  const [difficulty, setDifficulty] = useState(initialState.difficult);
  const [muscleGroup, setMuscleGroup] = useState(initialState.muscleGroup);
  const [exercisesBlocks, setExercisesBlocks] = useState([]);
  const [error, setError] = useState(initialState.error);
  const [customModalData, setCustomModalData] = useState(
    initialState.customModalData
  );
  let history = useHistory();

  const addBlockToRoutine = () => {
    if (exercisesBlocks.length < 10) {
      const block = new ObjectBlock(nanoid());
      addBlock(block.id);
      setExercisesBlocks([...exercisesBlocks, block]);
    } else {
      setError({ content: "Límite de bloques alcanzado.", variant: "danger" });
    }
  };

  const deleteBlock = (idBlock) => {
    const listAux = exercisesBlocks.filter((block) => block.id != idBlock);
    deleteBlockFromRoutine(idBlock);
    setExercisesBlocks(listAux);
  };

  const addExerciseToBlockById = (idBlock, exercise) => {
    const targetBlock = exercisesBlocks.find((block) => block.id == idBlock);
    if (targetBlock.listExercises.length < 15) {
      const listAux = exercisesBlocks.map((block) => {
        if (block.id == idBlock) {
          block.listExercises.push(exercise);
          addExerciseToBlock(idBlock, exercise);
        }
        return block;
      });

      setExercisesBlocks(listAux);
    } else {
      setError({
        content: "Se alcanzó el límite de ejercicios permitidos en un bloque.",
        variant: "danger",
      });
    }
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
      setCustomModalData({
        title: "Guardar rutina",
        body: "¿Seguro que desea guardar la rutina?",
        handleAccept: () => {
          saveRoutine();
          setError({
            content: "La rutina ha sido guardada con éxito.",
            variant: "success",
          });
          setCustomModalData(initialState.customModalData);
          clearFields();
        },
      });
    } else {
      setError({
        content: message,
        variant: "danger",
      });
    }
  };

  const clearFields = () => {
    setCustomModalData(initialState.customModalData);
    setDifficulty(initialState.difficult);
    setMuscleGroup(initialState.muscleGroup);
    setExercisesBlocks([]);
    Array.from(document.querySelectorAll("input,textarea")).forEach(
      (input) => (input.value = "")
    );
    const e = new Event("change", { bubbles: true });
    formControlFile.dispatchEvent(e);
    resetContext();
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
      {customModalData && (
        <CustomModal
          active={customModalData ? true : false}
          title={customModalData.title}
          body={customModalData.body}
          handleAccept={customModalData.handleAccept}
          handleClose={() => setCustomModalData(null)}
        ></CustomModal>
      )}
      {error && (
        <CustomAlert
          variant={error.variant}
          content={error.content}
          closeError={() => {
            setError(null);
          }}
        ></CustomAlert>
      )}
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
                defaultImage={defaultRoutineImage}
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
                      style={{ maxHeight: "113px" }}
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
            onClick={() => {
              addBlockToRoutine();
            }}
          >
            <span className="d-flex align-items-center">
              <RiAddFill size="2rem"></RiAddFill>
              Agregar bloque
            </span>
          </Button>
        </div>
        {showExercisesBlocksInput()}
        <div
          className="w-100 bg-black-background d-flex"
          style={{
            position: "fixed",
            bottom: "0",
            justifyContent: "center",
            alignItems: "center",
            height: "7%",
          }}
        >
          <Button
            className="w-25 mr-5"
            variant="outline-danger"
            onClick={() =>
              setCustomModalData({
                title: "Cancelar operación.",
                body:
                  "¿Seguro que desea cancelar la operación? Al aceptar la información ingresada hasta el momento será eliminada.",
                handleAccept: () => {
                  addBlockToRoutine();
                },
              })
            }
          >
            Cancelar
          </Button>
          <Button className="w-25 " variant="outline-success" type="submit">
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
