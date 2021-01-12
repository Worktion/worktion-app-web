import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../context/user-context";

const customRender = (ui, providerProps) => {
  if (providerProps) {
    return render(
      <UserProvider value={providerProps}>
        <MemoryRouter>{ui}</MemoryRouter>
      </UserProvider>
    );
  } else {
    return render(
      <UserProvider>
        <MemoryRouter>{ui}</MemoryRouter>
      </UserProvider>
    );
  }
};

// re-export everything
export * from "@testing-library/react";

export * from "@testing-library/jest-dom";

// override render method
export { customRender as render };
