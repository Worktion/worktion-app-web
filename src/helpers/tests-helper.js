import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../context/user-context";


const Wrapper = ({ children }) => {
  return (
    <UserProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </UserProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from "@testing-library/react";

export * from "@testing-library/jest-dom"

// override render method
export { customRender as render };