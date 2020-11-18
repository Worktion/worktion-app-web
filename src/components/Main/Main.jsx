import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  margin-left: 14rem;
  position: relative;
  padding: 0 2rem;
  background-color: #121212;
`;

const Main = ({ content }) => {
  return <Container>{content}</Container>;
};

export default Main;
