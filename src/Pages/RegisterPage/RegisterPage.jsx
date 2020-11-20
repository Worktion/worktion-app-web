import React from 'react';
import { Form, Button, Card, Container, Col, Row } from 'react-bootstrap';
import CustomAlert from "../../components/Alert/CustomAlert";
import { useUser } from '../../context/user-context';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const RegisterPage = () => {
  const history = useHistory();
  const { signup, login } = useUser()
  const { register, handleSubmit, getValues, errors } = useForm();

  const [alert, setAlert] = useState({
    message: '',
    type: '',
  });

  const showAlert = (message, type) => {
    console.log(message);
    setAlert({
      message: message,
      type: type,
    });
  };

  const closeError = () => {
    setAlert(null);
  };

  const handleSignupClick = async (data) => {
    try {
      await signup(data);
      showAlert('Te has registrado exitosamente, ahora inicia sesión :)', "success");
      await sleep(2000);
      history.push("/login");
    } catch (error) {
      console.log(String(error));
      if (error.data.email) {
        showAlert('El email ya ha sido registrado', "danger");
      }
      if (error.data.username) {
        showAlert('El nombre de usuario ya existe', "danger");
      }
    }
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    history.push("/login");
  }

  return (
    <div className='vh-100 w-100 bg-black-background'>
      <CustomAlert
        variant={alert.type}
        content={alert.message}
        closeError={closeError}
      ></CustomAlert>
      <Container className='d-flex justify-content-center'>
        <Card className='mt-5 d-inline-flex align-items-center bg-primary-surface-3dp '>
          <Card.Header as='h5' className="text-primary-white">Registro</Card.Header>
          <Card.Body className=''>
            <Form onSubmit={handleSubmit(handleSignupClick)}>
              <Form.Row>
                <Col>
                  <Form.Group controlId='first_name' >
                    <Form.Label className="text-primary-white">Nombre</Form.Label>
                    <Form.Control
                      className="bg-primary-surface-8dp text-primary-white border-0"
                      name='first_name'
                      type='text'
                      placeholder='Ingresa tu nombre'
                      ref={register({
                        required: "Este campo es requerido",
                        maxLength: {
                          value: 40,
                          message: "Solo se permiten 40 carácteres"
                        }
                      })}
                    />
                    {errors.first_name && <span className='text-danger'>{errors.first_name.message}</span>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='last_name'>
                    <Form.Label className="text-primary-white">Apellidos</Form.Label>
                    <Form.Control
                      className="bg-primary-surface-8dp text-primary-white border-0"
                      name='last_name'
                      type='text'
                      placeholder='Ingresa tus apellidos'
                      ref={register({
                        required: "Este campo es requerido",
                        maxLength: {
                          value: 40,
                          message: "Solo se permiten 40 carácteres"
                        }
                      })}
                    />
                    {errors.last_name && <span className='text-danger'>{errors.last_name.message}</span>}
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId='username'>
                    <Form.Label className="text-primary-white">Usuario</Form.Label>
                    <Form.Control
                      className="bg-primary-surface-8dp text-primary-white border-0"
                      name='username'
                      type='text'
                      placeholder='Ingresa tu nombre de usuario'
                      ref={register({
                        required: "Este campo es requerido",
                        maxLength: {
                          value: 40,
                          message: "Solo se permiten 40 carácteres"
                        }
                      })}
                    />
                    {errors.username && <span className='text-danger'>{errors.username.message}</span>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='email'>
                    <Form.Label className="text-primary-white">Email</Form.Label>
                    <Form.Control
                      className="bg-primary-surface-8dp text-primary-white border-0"
                      name='email'
                      type='email'
                      placeholder='Ingresa tu email'
                      ref={register({
                        required: "Este campo es requerido",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Dirección de email inválida"
                        }
                      })}
                    />
                    {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId='password'>
                    <Form.Label className="text-primary-white">Contraseña</Form.Label>
                    <Form.Control
                      className="bg-primary-surface-8dp text-primary-white border-0"
                      name='password'
                      type='password'
                      placeholder='Ingresa tu contraseña'
                      ref={register({
                        required: "Este campo es requerido",
                        minLength: {
                          value: 8,
                          message: "La contraseña debe contener mínimo 8 carácteres"
                        }
                      })}
                    />
                    <Form.Text className="text-muted">
                      Las contraseña debe de ser de al menos 8 carácteres
                  </Form.Text>
                    {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                  </Form.Group>

                </Col>
                <Col>
                  <Form.Group controlId='confirm_password'>
                    <Form.Label className="text-primary-white">Confirmar contraseña</Form.Label>
                    <Form.Control
                      className="bg-primary-surface-8dp text-primary-white border-0"
                      name='confirm_password'
                      type='password'
                      placeholder='Escribe de nuevo tu contraseña'
                      ref={register({
                        required: "Este campo es requerido",
                        validate: value => value === getValues("password") || 'Las contraseñas deben coincidir'
                      })}
                    />
                    <Form.Text className="text-muted">
                      Las dos contraseñas deben de coincidir
                  </Form.Text>
                    {errors.confirm_password && <span className='text-danger'>{errors.confirm_password.message}</span>}
                  </Form.Group>

                </Col>
              </Form.Row>
              <Form.Row className='d-flex justify-content-center'>
                <Button className='w-50'
                  variant="outline-success"
                  type='submit'>
                  Registrarse
              </Button>
              </Form.Row>
            </Form>
            <Container >
            <Row className="justify-content-md-center"> 
                <Button className='mt-3 w-50'
                  variant="outline-danger"
                  type='submit'
                  onClick={handleBackClick}>
                  Regresar
              </Button>

            </Row>

            </Container>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterPage;
