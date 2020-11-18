import React from "react";
import logoWorktion from "../../images/LogoWorktion.png";
import styled from "styled-components";

const LogoImg = styled.img`
  width: 100px;
  height: 100px;
`;

const LogoWorktion = () => {
  return <LogoImg src={logoWorktion} alt="Logo worktion"></LogoImg>;
};

export default LogoWorktion;