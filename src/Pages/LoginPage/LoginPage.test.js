import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "../../helpers/tests-helper";
import LoginPage from "./LoginPage";
import mockedAxios from "axios";
import App from "../../components/App/App";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
}));

describe("<LoginPage />", () => {
  it("renders without crashing", () => {
    render(<LoginPage />);
  });

  it("validates empty fields", async () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByText("Iniciar sesión"));

    await waitFor(() => screen.getByRole("alert"));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Ingresa información en todos los campos por favor"
    );
  });

  it("validates email", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "correo_electrónico" },
    });

    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText("Iniciar sesión"));

    await waitFor(() => screen.getByRole("alert"));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Ingrese un correo electrónico valido"
    );
  });

  it("sends valid fields with axios", async () => {
    const dataPost = {
      data: {
        access: 123,
        refresh: 123,
      },
    };

    mockedAxios.post.mockResolvedValueOnce(dataPost);

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "correo@gmail.com" },
    });

    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "password" },
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Iniciar sesión"));
    });
  });

  it("navigates to register page", async () => {
    render(<App />);

    fireEvent.click(screen.getByText("¿Aún no tienes cuenta?"));

    expect(screen.getByText("Registrarse"));
  });
});
