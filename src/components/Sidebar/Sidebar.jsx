import React from "react";
import styled from "styled-components";
import Menu from "./Menu/Menu";
import Profile from "./Menu/Profile";

const Container = styled.div`
  background-color: #f8f8f8;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index:100;
`;

const Sidebar = () => {
  return (
    <Container>
      <Profile></Profile>
      <Menu />
    </Container>
  );
};

export default Sidebar;
