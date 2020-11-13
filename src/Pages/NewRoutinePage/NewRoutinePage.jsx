import React from "react";
import { useUser } from "../../context/user-context";
import { Button } from "react-bootstrap";

const NewRoutinePage = () => {
  const { user } = useUser();

  return (
    <div>
      <h1>Crear rutina </h1>
    </div>
  );
};

export default NewRoutinePage;
