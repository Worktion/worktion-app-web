import React from "react";
import styled from "styled-components";
import Menu from "./Menu/Menu";
import Profile from "./Menu/Profile";
import LogoWorktion from "../../images/LogoWorktion.png";


const LogoImg = styled.img`
  width: 100px;
  height: 100px;
`

const Container = styled.div`
  background-color: #121212;  
  opacity: 89%;
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

const Sidebar = ({myRoutineItem, newRoutineItem}) => {
  return (
    <Container>
    
     <LogoImg src={LogoWorktion} alt="Logo worktion"></LogoImg>
     
      <Profile></Profile>
      <Menu myRoutineItem={myRoutineItem} newRoutineItem={newRoutineItem} />
    </Container>
  );
};

export default Sidebar;
