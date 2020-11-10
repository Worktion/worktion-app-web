import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/user-context";
import { Form, Button, Card, Container, Navbar } from "react-bootstrap";
import CustomAlert from "../../components/Alert/CustomAlert";

const LoginPage = () => {
  const { login } = useUser();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const onHandleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();

    if (state.email && state.password) {
      if (emailIsValid(state.email)) {
        try {
          await login(state.email, state.password);
        } catch (error) {
          showError("Credenciales incorrectas");
        }
      } else {
        showError("Ingrese un correo electrónico valido");
      }
    } else {
      showError("Ingresa información en todos los campos por favor");
    }
  };

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const showError = (errorMessage) => {
    setError(errorMessage);
  };

  const closeError = () => {
    setError(null);
  };

  return (
    <div>
      <Navbar expand="lg" variant="dark justify-content-center" bg="primary">
        <Navbar.Text className="h2 text-white" href="#">
          Worktion
        </Navbar.Text>
      </Navbar>
      <CustomAlert
        variant={"danger"}
        content={error}
        closeError={closeError}
      ></CustomAlert>
      <Container>
        <Card className=" m-5">
          <Card.Header as="h5">Iniciar sesión</Card.Header>
          <Card.Body>
            <Form className="m-3">
              <Form.Group controlId="email">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  onChange={onHandleChange}
                />
                <Form.Text className="text-muted">
                  Tu información se encuentra protegida
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  autoComplete="on"
                  type="password"
                  placeholder="Contraseña"
                  onChange={onHandleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={handleLoginClick}
              >
                Iniciar sesión
              </Button>
              <Link to="/register" className="link ml-5">
                ¿Aún no tienes cuenta?
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
