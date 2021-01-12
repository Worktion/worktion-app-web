import React, { useState } from "react";
import styled from "styled-components";
import MenuLink from "./MenuLink";
import { FaPlusSquare, FaSignInAlt } from "@meronex/icons/fa";

const Container = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
`;

const MenuLogout = () => {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuLink
          title="Crea tu rutina"
          icon={<FaPlusSquare size="2em" />}
          path="/register"
        />
        <small
          className="text-primary-white"
          style={{
            alignSelf: "center",
          }}
        >
          ¡Registrate en Worktion!
        </small>
      </div>

      <MenuLink
        title="Iniciar sesión"
        icon={<FaSignInAlt size="2em" />}
        path="/login"
      />
    </Container>
  );
};

export default MenuLogout;
