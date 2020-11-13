import React, { useState } from "react";
import MenuLink from "./MenuLink";
import styled from "styled-components";
import { useUser } from "../../../context/user-context";

const Container = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const Menu = () => {
  const { logout } = useUser();

  const [state, setState] = useState({
    myRoutineSelected: false,
    newRoutineSelected: false,
    logoutSelected: false,
  });

  const handleSelected = (e) => {
    const { id } = e.target;
    setState({
      [id]: true,
    });
  };
  
  return (
    <Container>
      <MenuLink
        id="myRoutineSelected"
        title="Mis rutinas"
        active={state.myRoutineSelected}
        handleClick={handleSelected}
        path="/home"
      />
      <MenuLink
        id="newRoutineSelected"
        title="Crear rutina"
        active={state.newRoutineSelected}
        handleClick={handleSelected}
        path="/newRoutine"
      />
      <MenuLink
        id="logoutSelected"
        title="Cerrar sesión"
        active={state.logoutSelected}
        handleClick={logout}
        path="/"
      />
    </Container>
  );
};

export default Menu;
