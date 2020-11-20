import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa"

const RoutineCard = ({ image }) => {

   //{name, description, is_public, time, difficulty, muscle_group, cover}
  return (
    <Card className="bg-white-with-opacity text-primary-white" style={{ width: "20rem", margin: "1rem" }}>
      <Card.Img
        style={{ height: "20vh", objectFit: "cover" }}
        variant="top"
        src={image}
      />
      <Card.Body>
        <Card.Title>Nombre de la rutina</Card.Title>
        <p>Es publica:</p>
        <p>Duración:</p>
        <p>Dificultad:</p>
        <p>Grupo muscular:</p>
      </Card.Body>
    </Card>
  );
};

export default RoutineCard;
