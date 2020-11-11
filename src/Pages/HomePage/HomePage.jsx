import React from "react";
import { useUser } from "../../context/user-context";
import {Button} from 'react-bootstrap';


const HomePage = () => {
  const { user, logout } = useUser();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    alert('Cerrando sesión');
    logout();
  };

  return (
    <div>
      <h1>Bienvendio tu HomePage {user.id} </h1>
      <Button variant='outline-danger' type='submit' onClick={handleLogoutClick}>
        Cerrar sesión
      </Button>
    </div>
  );
};

export default HomePage;
