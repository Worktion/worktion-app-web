import React from "react";
import { useUser } from "../../context/user-context";
import { Button } from "react-bootstrap";
import SearchExerciseModal from "../../components/SearchExerciseModal/SearchExerciseModal"

const NewRoutinePage = () => {
  const { user } = useUser();

  return (
    <div>
      <h1>Crear rutina </h1>
      <SearchExerciseModal/>
    </div>
  );
};

export default NewRoutinePage;
