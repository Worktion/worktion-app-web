import React, { useState } from "react";
import MenuLink from "./MenuLink";
import styled from "styled-components";
import { useUser } from "../../../context/user-context";
import { FaPlusSquare, FaLayerGroup, FaSignOutAlt } from "react-icons/fa";

const Container = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const Menu = ({ myRoutineItem, newRoutineItem }) => {
  const { logout } = useUser();

  const [state, setState] = useState({
    myRoutineSelected: myRoutineItem,
    newRoutineSelected: newRoutineItem,
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
        active={state.myRoutineSelected ? 1 : 0}
        handleClick={handleSelected}
        icon={<FaLayerGroup size="2em" />}
        path="/home"
      />
      <MenuLink
        id="newRoutineSelected"
        title="Crear rutina"
        active={state.newRoutineSelected ? 1 : 0}
        handleClick={handleSelected}
        icon={<FaPlusSquare size="2em" />}
        path="/newRoutine"
      />
      <MenuLink
        id="logoutSelected"
        title="Cerrar sesión"
        icon={<FaSignOutAlt size="2em"/>}
        handleClick={logout}
        path="/"
      />
    </Container>
  );
};

export default Menu;
