import React, { useState } from "react";
import MenuLink from "./MenuLink";
import styled from "styled-components";
import { useUser } from "../../../context/user-context";
import { FaPlusSquare, FaLayerGroup, FaSignOutAlt } from "react-icons/fa";

const Container = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
`;

const Menu = ({ myRoutineItem, newRoutineItem, changeItemSelected }) => {
  const { logout } = useUser();

  const handleMyroutineSelected = (e) => {
    changeItemSelected(true, false, false);
  };

  const handleNewRoutineSelected = (e) => {
    changeItemSelected(false, true, false);
  };

  return (
    <Container>
      <MenuLink
        id="myRoutineSelected"
        title="Mis rutinas"
        active={myRoutineItem ? 1 : 0}
        handleClick={handleMyroutineSelected}
        icon={<FaLayerGroup size="2em" />}
        path="/home"
      />
      <MenuLink
        id="newRoutineSelected"
        title="Crear rutina"
        active={newRoutineItem ? 1 : 0}
        handleClick={handleNewRoutineSelected}
        icon={<FaPlusSquare size="2em" />}
        path="/newRoutine"
      />
      <MenuLink
        id="logoutSelected"
        title="Cerrar sesión"
        icon={<FaSignOutAlt size="2em" />}
        handleClick={logout}
        margintop={"auto"}
        path="/"
      />
    </Container>
  );
};

export default Menu;
