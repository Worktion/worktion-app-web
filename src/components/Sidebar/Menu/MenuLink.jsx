import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Container = styled.div`
  border-left: 3px solid ${(props) => (props.active ? "#000" : "transparent")};
  width: 100%;
  padding: 0.3rem;
  padding-left: 2rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  transition: 0.2s all ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Span = styled.span`
  font-size: 1rem;
  margin-right: 1rem;
`;

const Title = styled.h1`
  font-size: 0.9rem;
  font-weight: 300;
  color: ${(props) => (props.active ? "#000" : "#AAA5A5")};
`;

const MenuLink = ({ id, title, active, handleClick, icon }) => {
  return (
    <Container id={id} active={active} onClick={handleClick}>
 
      <Title id={id} active={active}>
        {title}
      </Title>
    </Container>
  );
};

export default MenuLink;
