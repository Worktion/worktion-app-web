import React, { useState, useEffect, useMemo } from "react";
import { nanoid } from "nanoid";

const RoutineContext = React.createContext();

function ObjectRoutine() {
  this.name = name;
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
    console.log(name, repetitions);
    routine.exercisesBlocks = routine.exercisesBlocks.map((block) => {
      if (block.id == idBlock) {
        block.name = name;
        block.repetitions = repetitions;
        console.log(block);
      }
      return block;
    });
    setRoutine(routine);
  }

  const value = useMemo(() => {
    return {
      routine,
      addBlock,
      deleteBlockFromRoutine,
      addExerciseToBlock,
      deleteExercise,
      addInfoToExercise,
      addInfoToBlock,
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
