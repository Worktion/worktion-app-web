import React from "react";
import ReactDOM from "react-dom";
import App from "../../components/App/App";
import { render, fireEvent, screen } from "@testing-library/react";

it("renders without crashing", async () => {
  render(<App />);

  fireEvent.click(screen.getByText(/¿Aún no tienes cuenta?/i));

  fireEvent.change(screen.getByLabelText(/nombre/i), {
    target: { value: "Test" },
  });

  fireEvent.change(screen.getByLabelText(/apellidos/i), {
    target: { value: "test" },
  });

  fireEvent.change(screen.getByLabelText(/usuario/i), {
    target: { value: "userTest" },
  });

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "test@gmail.com" },
  });

  fireEvent.change(screen.getByLabelText("Contraseña"), {
    target: { value: "12345678" },
  });

  fireEvent.change(screen.getByLabelText("Confirmar contraseña"), {
    target: { value: "12345678" },
  });

  fireEvent.click(screen.getByText(/Registrarse/i));

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/exitosamente/i);
});
