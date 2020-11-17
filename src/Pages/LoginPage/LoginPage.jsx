import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/user-context";
import { Form, Button, Card, Container, Navbar } from "react-bootstrap";
import CustomAlert from "../../components/Alert/CustomAlert";
import LogoWorktion from "../../components/LogoWorktion/LogoWorktion";

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
    <div className="vh-100 w-100 bg-black-background">
      <CustomAlert
        variant={"danger"}
        content={error}
        closeError={closeError}
      ></CustomAlert>
      <Container className="d-flex justify-content-center">
        <Card className=" m-5 d-inline-flex align-items-center bg-primary-black col-lg-8 ">
          <LogoWorktion></LogoWorktion>
          <h5 className="text-primary-white">¿Estás listo?</h5>
          <Card.Body className="col-lg-12 d-flex flex-column justify-content-center">
            <Form>
              <Form.Group controlId="email">
                <Form.Label className="text-primary-white">
                  Correo electrónico
                </Form.Label>
                <Form.Control
                  className="bg-primary-white"
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  onChange={onHandleChange}
                />
                <Form.Text className="text-primary-white">
                  Tu información se encuentra protegida
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label className="text-primary-white">
                  Contraseña
                </Form.Label>
                <Form.Control
                  className="bg-primary-white"
                  autoComplete="on"
                  type="password"
                  placeholder="Contraseña"
                  onChange={onHandleChange}
                />
              </Form.Group>
              <Button
                variant="outline-success"
                type="submit"
                onClick={handleLoginClick}
                size="lg"
                block
              >
                Iniciar sesión
              </Button>
            </Form>
          </Card.Body>
          <Link to="/register" className="link text-primary-white ">
            ¿Aún no tienes cuenta?
          </Link>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
