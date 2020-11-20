import React from "react";
import { Card } from "react-bootstrap";

const RoutineCard = ({ routine }) => {
  return (
    <Card
      className="bg-white-with-opacity text-primary-white"
      style={{ width: "20rem", margin: "1rem" }}
    >
      <Card.Img
        style={{ height: "20vh", objectFit: "cover" }}
        variant="top"
        src={routine.cover}
      />
      <Card.Body>
        <Card.Title>{routine.name}</Card.Title>
        <p>{routine.is_public ? "Rutina publica" : "Rutina privada"}</p>
        <p>Duración: {routine.time}</p>
        <p>Dificultad: {routine.dificulty}</p>
        <p>Grupo muscular: {routine.muscle_group}</p>
      </Card.Body>
    </Card>
  );
};

export default RoutineCard;
