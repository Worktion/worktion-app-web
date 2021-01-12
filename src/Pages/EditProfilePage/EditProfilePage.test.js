import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "../../helpers/tests-helper";
import EditProfile from "./EditProfilePage";
import mockedAxios from "axios";

describe("<EditProfilePage />", () => {
  const providerProps = {
    user: {
      email: "juan@gmail.com",
      username: "juan123",
      first_name: "Juan",
      last_name: "Pérez",
      bio: "Una corta biografía sobre Juan",
      birth_date: "1998-04-14",
      cover: "path",
    },
  };

  it("renders without crashing", () => {
    render(<EditProfile />, providerProps);

    expect(screen.getByText("Perfil")).toBeInTheDocument();
  });

  it("shows correct email", async () => {
    render(<EditProfile />, providerProps);
    expect(screen.getByLabelText("Email")).toHaveValue(
      providerProps.user.email
    );
  });

  it("shows correct username", async () => {
    render(<EditProfile />, providerProps);
    expect(screen.getByLabelText("Usuario")).toHaveValue(
      providerProps.user.username
    );
  });

  it("shows correct first_name", async () => {
    render(<EditProfile />, providerProps);
    expect(screen.getByLabelText("Nombre")).toHaveValue(
      providerProps.user.first_name
    );
  });

  it("shows correct last_name", async () => {
    render(<EditProfile />, providerProps);
    expect(screen.getByLabelText("Apellidos")).toHaveValue(
      providerProps.user.last_name
    );
  });

  it("shows correct bio", async () => {
    render(<EditProfile />, providerProps);
    expect(screen.getByLabelText("Biografía")).toHaveValue(
      providerProps.user.bio
    );
  });

  it("shows correct birthdate", async () => {
    render(<EditProfile />, providerProps);
    expect(screen.getByLabelText("Fecha Nacimiento")).toHaveValue(
      providerProps.user.birth_date
    );
  });

  it("shows correct cover", async () => {
    render(<EditProfile />, providerProps);
    expect(screen.getByAltText("Foto de perfil")).toHaveAttribute(
      "src",
      providerProps.user.cover
    );
  });

  it("validates required fields", async () => {
    render(<EditProfile />, providerProps);

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "" },
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Actualizar"));
    });

    expect(screen.getByText("Este campo es requerido")).toBeInTheDocument();
  });

  it("shows confirmation message", async () => {
    render(<EditProfile />, providerProps);

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Nuevo nombre" },
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Actualizar"));
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("update field with axios", async () => {
    const { location } = window;
    delete window.location;
    window.location = { reload: jest.fn() };

    const data = {
      data: { ...providerProps },
    };

    mockedAxios.patch.mockResolvedValueOnce(data);

    render(<EditProfile />, providerProps);

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Nuevo nombre" },
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Actualizar"));
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Aceptar"));
    });

    expect(screen.getByLabelText("Nombre")).toHaveValue("Nuevo nombre");

    window.location = location;
  });
});
