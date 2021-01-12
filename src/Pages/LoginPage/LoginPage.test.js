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
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
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

  it("sends login valid fields with axios", async () => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();

    const dataPost = {
      data: {
        access:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA1NTA1NTYzLCJqdGkiOiJhNTI2M2YyODVkMWM0MTFjYjQ1MzgyY2Q0OWRlYjgxYSIsInVzZXJfaWQiOjF9.jQuGqskTbuKfJTcUC31fVzi-JDt1bb2xJi9ySbyyqN8",
        refresh: 123,
      },
    };

    const dataGet = {
      data: {
        email: "juan@gmail.com",
        username: "juan123",
        first_name: "Juan",
        last_name: "Pérez",
        bio: "Una corta biografía sobre Juan",
        birth_date: "1998-04-14",
        cover: "path",
      },
    };

    mockedAxios.post.mockResolvedValueOnce(dataPost);
    mockedAxios.get.mockResolvedValueOnce(dataGet);

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

    expect(screen.getByText("Registrarse")).toBeInTheDocument();
  });
});
