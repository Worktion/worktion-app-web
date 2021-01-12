import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "../../helpers/tests-helper";
import RegisterPage from "./RegisterPage";
import mockedAxios from "axios";

describe("<RegisterPage />", () => {
  it("renders without crashing", () => {
    render(<RegisterPage />);
    expect(screen.getByText("Registro")).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(<RegisterPage />);

    fireEvent.click(screen.getByText("Registrarse"));

    expect(
      await waitFor(() => screen.getAllByText("Este campo es requerido")[0])
    ).toBeInTheDocument();
  });

  it("validates password length", async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByText("Registrarse"));

    expect(
      await waitFor(() =>
        screen.getByText("La contraseña debe contener mínimo 8 carácteres")
      )
    ).toBeInTheDocument();
  });

  it("validates password and confirm password are the same", async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "Contra_123" },
    });

    fireEvent.change(screen.getByLabelText("Confirmar contraseña"), {
      target: { value: "Contra" },
    });

    fireEvent.click(screen.getByText("Registrarse"));

    expect(
      await waitFor(() => screen.getByText("Las contraseñas deben coincidir"))
    ).toBeInTheDocument();
  });

  it("sends valid fields with axios", async () => {
    const data = {
      data: {
        id: 1,
        username: "userTest",
      },
    };

    mockedAxios.post.mockResolvedValueOnce(data);

    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Test" },
    });

    fireEvent.change(screen.getByLabelText("Apellidos"), {
      target: { value: "test" },
    });

    fireEvent.change(screen.getByLabelText("Usuario"), {
      target: { value: "userTest" },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@gmail.com" },
    });

    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "Contra_123" },
    });

    fireEvent.change(screen.getByLabelText("Confirmar contraseña"), {
      target: { value: "Contra_123" },
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Registrarse"));
    });

    expect(
      screen.getByText("Te has registrado exitosamente, ahora inicia sesión :)")
    ).toBeInTheDocument();
  });
});
