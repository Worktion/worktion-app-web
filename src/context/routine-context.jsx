import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import * as constants from "../constants/constants";

const RoutineContext = React.createContext();

function ObjectRoutine() {
  this.exercisesBlocks = [];
}

function ObjectBlock(id) {
  this.id = id;
  this.name = "";
  this.repetitions = 0;
  this.listExercises = [];
}

export function RoutineProvider(props) {
  const [routine, setRoutine] = useState(new ObjectRoutine());

  function addBlock(idBlock) {
    routine.exercisesBlocks.push(new ObjectBlock(idBlock));
    setRoutine(routine);
  }

  function deleteBlockFromRoutine(idBlock) {
    routine.exercisesBlocks = routine.exercisesBlocks.filter(
      (block) => block.id != idBlock
    );
    setRoutine(routine);
  }

  function addExerciseToBlock(idBlock, exercise) {
    routine.exercisesBlocks = routine.exercisesBlocks.map((block) => {
      if (block.id == idBlock) block.listExercises.push(exercise);
      return block;
    });
    setRoutine(routine);
  }

  function deleteExercise(idBlock, idExercise) {
    routine.exercisesBlocks = routine.exercisesBlocks.map((block) => {
      if (block.id == idBlock) {
        block.listExercises = block.listExercises.filter(
          (exercise) => exercise.id != idExercise
        );
      }
      return block;
    });
    setRoutine(routine);
  }

  function addInfoToExercise(idBlock, idExercise, quantity, executionType) {
    routine.exercisesBlocks = routine.exercisesBlocks.map((block) => {
      if (block.id == idBlock) {
        block.listExercises.map((exercise) => {
          if (idExercise == exercise.id) {
            exercise.quantity = quantity;
            exercise.executionType = executionType;
          }
        });
      }
      return block;
    });
    setRoutine(routine);
  }

  function addInfoToBlock(idBlock, name, repetitions) {
    routine.exercisesBlocks = routine.exercisesBlocks.map((block) => {
      if (block.id == idBlock) {
        block.name = name;
        block.repetitions = repetitions;
      }
      return block;
    });
    setRoutine(routine);
  }

  function addInfoToRoutine(infoExercise, muscleGroup, difficult) {
    routine.name = infoExercise.routineName;
    routine.description = infoExercise.description;
    routine.cover = infoExercise.cover[0];
    routine.time = infoExercise.routineTime;
    routine.muscleGroup = muscleGroup;
    routine.difficult = difficult;
    setRoutine(routine);
  }

  async function saveRoutine() {
    const request = {
      name: routine.name,
      description: routine.description,
      time: parseInt(routine.time),
      is_public: false,
      dificulty: constants.KeyRoutineDifficulties[routine.difficult],
      muscle_group: constants.keyMuscleGroups[routine.muscleGroup],
      blocks: routine.exercisesBlocks.map((block) => {
        return {
          name: block.name,
          quantity: parseInt(block.repetitions),
          exercises: block.listExercises.map((exercise) => {
            return {
              exercise_id: exercise.id,
              typeExecution:
                constants.keysExecutionTypes[exercise.executionType],
              quantity: parseInt(exercise.quantity),
            };
          }),
        };
      }),
    };

    const { data } = await Axios.post("/api/routines/", request);
    console.log("Respuesta", data)
    await saveRoutineCover(data.id);
  }

  const saveRoutineCover = async (idRoutine) => {
    const formData = new FormData();
    formData.append("cover", routine.cover);
    const { data } = await Axios.patch(`/api/routines/${idRoutine}/`, formData);
    console.log("Todo bien", data);
  };

  function isRoutineValid() {
    let errorMessage = true;

    if (routine.muscleGroup == "Grupo muscular") {
      errorMessage = "Selecciona un grupo muscular.";
    } else if (routine.difficult == "Dificultad") {
      errorMessage = "Selecciona una dificultad.";
    } else if (routine.cover == null) {
      errorMessage = "Selecciona una imagen.";
    } else if (routine.exercisesBlocks.length == 0) {
      errorMessage =
        "La rutina debe contener al menos un bloque de ejercicios.";
    } else if (areEmptyBlocks()) {
      errorMessage = "Cada bloque debe contener al menos un ejercicio.";
    } else if (areBlockInfoEmpty()) {
      errorMessage =
        "Verifique que la información de cada bloque se encuentre completa.";
    }

    return errorMessage;
  }

  const areEmptyBlocks = () => {
    const areValid = routine.exercisesBlocks.map((block) => {
      if (block.listExercises.length == 0) {
        return false;
      }
      return block;
    });

    return areValid.includes(false);
  };

  const areBlockInfoEmpty = () => {
    const areValid = routine.exercisesBlocks.map((block) => {
      if (block.name == "" || block.repetitions == 0) {
        return false;
      }
      return block;
    });

    return areValid.includes(false);
  };

  const value = useMemo(() => {
    return {
      routine,
      addBlock,
      deleteBlockFromRoutine,
      addExerciseToBlock,
      deleteExercise,
      addInfoToExercise,
      addInfoToBlock,
      addInfoToRoutine,
      saveRoutine,
      isRoutineValid,
    };
  }, [routine]);

  return <RoutineContext.Provider value={value} {...props} />;
}

export function useRoutine() {
  const context = React.useContext(RoutineContext);
  if (!context) {
    throw new Error("useRoutine must be in RoutineContext provider");
  }
  return context;
}
