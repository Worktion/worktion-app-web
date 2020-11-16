import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  border-left: 3px solid
    ${(props) => (props.active ? "#ff3b14" : "transparent")};
  width: 100%;
  padding: 0.3rem;
  padding-left: 2rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "1rem")};
  transition: 0.2s all ease-in-out;
  background-color: ${(props) => (props.active ? "#000" : null)};
  &:hover {
    background-color: #000;
  }
`;

const StyledLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: 300;
  color: ${(props) => (props.active ? "#fff" : "grey")};
  display: ${(props) => (props.display ? props.display : null)};
  margin-top: ${(props) => (props.margintop ? props.margintop : null)};
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  &:hover {
    color: #fff;
  }
`;

const StyledSpan = styled.span`
  margin-left: 1rem;
  font-size: 1.5em;
`;

const MenuLink = ({
  id,
  title,
  active,
  handleClick,
  icon,
  path,
  margintop,
}) => {
  return (
    <StyledLink
      to={path}
      active={active}
      margintop={margintop}
    >
      <Container id={id} active={active} onClick={handleClick}>
        {icon}
        <StyledSpan id={id}>{title}</StyledSpan>
      </Container>
    </StyledLink>
  );
};

export default MenuLink;
