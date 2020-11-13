import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const StyledLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: 300;
  color: ${(props) => (props.active ? "#000" : "#AAA5A5")};
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  &:hover {
    color: #000;
  }
`;

const MenuLink = ({ id, title, active, handleClick, icon, path }) => {
  return (
    <StyledLink id={id} to={path}>
      <Container id={id} active={active} onClick={handleClick}>
        {" "}
        {title}
      </Container>
    </StyledLink>
  );
};

export default MenuLink;
