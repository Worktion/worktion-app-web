import React from "react";
import { useUser } from "../../context/user-context";
import Axios from "axios";
import { Button } from "react-bootstrap";
const HomePage = () => {
  const { user } = useUser();
  return (
    <div>
      <h1>Bienvendio tu HomePage {user.id} </h1>
      <Button onClick= {getUser}> Recuperar usuarios </Button>
    </div>
  );
};

export default HomePage;
