import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: auto;
  margin-left: 16rem;
  position: relative;
  padding: 0 2rem;
`;

const Main = ({ content }) => {
  return <Container>{content}</Container>;
};

export default Main;
