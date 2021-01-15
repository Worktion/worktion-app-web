import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "../../helpers/tests-helper";
import NewRoutinePage from "./NewRoutinePage";
import mockedAxios from "axios";

describe("<NewRoutinePage/>", () => {
  it("renders without crashing", () => {
    render(<NewRoutinePage />);
  });

  it("validates required fields", async () => {
    render(<NewRoutinePage />);

    await act(async () => {
      fireEvent.click(screen.getByText("Guardar"));
    });

    expect(
      screen.getAllByText("Este campo es requerido")[0]
    ).toBeInTheDocument();
  });

  it("validates muscle group selected", async () => {
    render(<NewRoutinePage />);

    fireEvent.change(screen.getByLabelText("Nombre de la rutina"), {
      target: { value: "Rutina de espalda" },
    });

    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "Rutina para una espalda fuerte" },
    });

    fireEvent.change(screen.getByPlaceholderText("Minutos"), {
      target: { value: 35 },
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Guardar"));
    });

    expect(
      screen.getByText("Selecciona un grupo muscular.")
    ).toBeInTheDocument();
  });

  it("validates difficult selected", async () => {
    render(<NewRoutinePage />);

    fireEvent.change(screen.getByLabelText("Nombre de la rutina"), {
      target: { value: "Rutina de espalda" },
    });

    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "Rutina para una espalda fuerte" },
    });

    fireEvent.change(screen.getByPlaceholderText("Minutos"), {
      target: { value: 35 },
    });

    document.getElementById("idDropDownMuscleGroup").click();

    fireEvent.click(screen.getByText("Brazos"));

    await act(async () => {
      fireEvent.click(screen.getByText("Guardar"));
    });

    expect(screen.getByText("Selecciona una dificultad.")).toBeInTheDocument();
  });

  it("validates image selected", async () => {
    render(<NewRoutinePage />);

    fireEvent.change(screen.getByLabelText("Nombre de la rutina"), {
      target: { value: "Rutina de espalda" },
    });

    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "Rutina para una espalda fuerte" },
    });

    fireEvent.change(screen.getByPlaceholderText("Minutos"), {
      target: { value: 35 },
    });

    document.getElementById("idDropDownMuscleGroup").click();
    fireEvent.click(screen.getByText("Brazos"));

    document.getElementById("idDropDownDifficult").click();
    fireEvent.click(screen.getByText("Novato"));

    await act(async () => {
      fireEvent.click(screen.getByText("Guardar"));
    });

    expect(screen.getByText("Selecciona una imagen.")).toBeInTheDocument();
  });

  it("validates block selected", async () => {
    render(<NewRoutinePage />);

    fireEvent.change(screen.getByLabelText("Nombre de la rutina"), {
      target: { value: "Rutina de espalda" },
    });

    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "Rutina para una espalda fuerte" },
    });

    fireEvent.change(screen.getByPlaceholderText("Minutos"), {
      target: { value: 35 },
    });

    document.getElementById("idDropDownMuscleGroup").click();
    fireEvent.click(screen.getByText("Brazos"));

    document.getElementById("idDropDownDifficult").click();
    fireEvent.click(screen.getByText("Novato"));

    fireEvent.change(screen.getByPlaceholderText("Minutos"), {
      target: { value: 35 },
    });

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    global.URL.createObjectURL = jest.fn();

    fireEvent.change(screen.getByLabelText("Seleccionar imagen"), {
      target: {
        files: [file],
      },
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Guardar"));
    });

    expect(
      screen.getByText(
        "La rutina debe contener al menos un bloque de ejercicios."
      )
    ).toBeInTheDocument();
  });

  it("validates exercise added to block", async () => {
    render(<NewRoutinePage />);

    fireEvent.change(screen.getByLabelText("Nombre de la rutina"), {
      target: { value: "Rutina de espalda" },
    });

    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "Rutina para una espalda fuerte" },
    });

    fireEvent.change(screen.getByPlaceholderText("Minutos"), {
      target: { value: 35 },
    });

    document.getElementById("idDropDownMuscleGroup").click();
    fireEvent.click(screen.getByText("Brazos"));

    document.getElementById("idDropDownDifficult").click();
    fireEvent.click(screen.getByText("Novato"));

    fireEvent.change(screen.getByPlaceholderText("Minutos"), {
      target: { value: 35 },
    });

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    global.URL.createObjectURL = jest.fn();

    fireEvent.change(screen.getByLabelText("Seleccionar imagen"), {
      target: {
        files: [file],
      },
    });

    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    await act(async () => {
      document.getElementById("buttonAddBlock").click();
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Guardar"));
    });

    expect(
      screen.getByText("Cada bloque debe contener al menos un ejercicio.")
    ).toBeInTheDocument();
  });

  it("validates information block", async () => {
    render(<NewRoutinePage />);

    fireEvent.change(screen.getByLabelText("Nombre de la rutina"), {
      target: { value: "Rutina de espalda" },
    });

    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "Rutina para una espalda fuerte" },
    });

    fireEvent.change(screen.getByPlaceholderText("Minutos"), {
      target: { value: 35 },
    });

    document.getElementById("idDropDownMuscleGroup").click();
    fireEvent.click(screen.getByText("Brazos"));

    document.getElementById("idDropDownDifficult").click();
    fireEvent.click(screen.getByText("Novato"));

    fireEvent.change(screen.getByPlaceholderText("Minutos"), {
      target: { value: 35 },
    });

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    global.URL.createObjectURL = jest.fn();

    fireEvent.change(screen.getByLabelText("Seleccionar imagen"), {
      target: {
        files: [file],
      },
    });

    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    await act(async () => {
      document.getElementById("buttonAddBlock").click();
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Agregar Ejercicio"));
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          description:
            "Es un ejercicio con una ejecución complicada, pero ayuda a fortalecer la espalda de manera increíble.",
          dificulty: "intermediate",
          id: 1,
          images: [
            {
              image: "",
            },
          ],
          name: "Pull up",
          similar_names: "Pull up, Dominada",
        },
      ],
    });

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Pull up..."), {
        target: { value: "pull" },
      });
    });

    await act(async () => {
      fireEvent.doubleClick(screen.getByAltText("Imagen de ejercicio"));
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Guardar"));
    });

    expect(
      screen.getByText(
        "Verifique que la información de cada bloque se encuentre completa."
      )
    ).toBeInTheDocument();
  });

  it("sends valid information to server", async () => {
    render(<NewRoutinePage />);

    fireEvent.change(screen.getByLabelText("Nombre de la rutina"), {
      target: { value: "Rutina de espalda" },
    });

    fireEvent.change(screen.getByLabelText("Descripción"), {
      target: { value: "Rutina para una espalda fuerte" },
    });

    fireEvent.change(screen.getByPlaceholderText("Minutos"), {
      target: { value: 35 },
    });

    document.getElementById("idDropDownMuscleGroup").click();
    fireEvent.click(screen.getByText("Brazos"));

    document.getElementById("idDropDownDifficult").click();
    fireEvent.click(screen.getByText("Novato"));

    fireEvent.change(screen.getByPlaceholderText("Minutos"), {
      target: { value: 35 },
    });

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    global.URL.createObjectURL = jest.fn();

    fireEvent.change(screen.getByLabelText("Seleccionar imagen"), {
      target: {
        files: [file],
      },
    });

    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    await act(async () => {
      document.getElementById("buttonAddBlock").click();
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Agregar Ejercicio"));
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          description:
            "Es un ejercicio con una ejecución complicada, pero ayuda a fortalecer la espalda de manera increíble.",
          dificulty: "intermediate",
          id: 1,
          images: [
            {
              image: "",
            },
          ],
          name: "Pull up",
          similar_names: "Pull up, Dominada",
        },
      ],
    });

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Pull up..."), {
        target: { value: "pull" },
      });
    });

    await act(async () => {
      fireEvent.doubleClick(screen.getByAltText("Imagen de ejercicio"));
    });

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Ingrese el nombre"), {
        target: { value: "Bloque de espala alta" },
      });
    });

    await act(async () => {
      document.getElementById("repetitions")
    });

    mockedAxios.post.mockResolvedValueOnce({
      data: {},
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Guardar"));
    });

    expect(
      screen.getByText("Verifique que la información de cada bloque se encuentre completa.")
    ).toBeInTheDocument();
  });
 
});
