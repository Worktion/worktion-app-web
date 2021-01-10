import React from "react";
import styled from "styled-components";
import LogoWorktion from "../../components/LogoWorktion/LogoWorktion";
import MenuLogout from "../Sidebar/Menu/MenuLogout"
import ProfilePublic from "../Sidebar/Menu/ProfilePublic"

const Container = styled.div`
  background-color: rgb(255, 255, 255, 0.05);
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

const SidebarLogout = ({user}) => {
  return (
    <Container>
      <LogoWorktion />
      <ProfilePublic user={user}></ProfilePublic>
      <MenuLogout></MenuLogout>
    </Container>
  );
};

export default SidebarLogout;
