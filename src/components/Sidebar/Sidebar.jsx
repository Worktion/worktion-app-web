import React, { useState } from "react";
import styled from "styled-components";
import Menu from "./Menu/Menu";
import Profile from "./Menu/Profile";
import LogoWorktion from "../../components/LogoWorktion/LogoWorktion";

const Container = styled.div`
  background-color: rgb(255,255,255, 0.05);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 14rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
`;

const Sidebar = ({ myRoutineItem, newRoutineItem }) => {
  const [state, setState] = useState({
    myRoutineSelected: myRoutineItem,
    newRoutineSelected: newRoutineItem,
    configSelected: false,
  });

  const changeItemSelected = (myRoutineItem, newRoutineItem, configItem) => {
    setState({
      myRoutineSelected: myRoutineItem,
      newRoutineSelected: newRoutineItem,
      configSelected: configItem,
    });
  };

  return (
    <Container>
      <LogoWorktion />
      <Profile
        changeItemSelected={changeItemSelected}
        active={state.configSelected}
      ></Profile>
      <Menu
        changeItemSelected={changeItemSelected}
        myRoutineItem={state.myRoutineSelected ? 1 : 0}
        newRoutineItem={state.newRoutineSelected ? 1 : 0}
      />
    </Container>
  );
};

export default Sidebar;
