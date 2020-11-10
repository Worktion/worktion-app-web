import React from 'react';
import { Form, Button, Card, Container, Navbar } from 'react-bootstrap';


const RegisterPage = () => {
  return (
    <div>
      <Navbar expand="lg" variant="dark justify-content-center" bg="primary">
        <Navbar.Text className="h2 text-white" href="#">
          Worktion
        </Navbar.Text>
      </Navbar>
      <Container className='d-flex justify-content-center'>
        <Card className='m-5 d-inline-flex w-50'>
          <Card.Header as='h5'>Registro</Card.Header>
          <Card.Body>
            <Form className='m-1'>
            <Form.Group controlId='first_name'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingresa tu nombre'
                />
            </Form.Group>
            <Form.Group controlId='last_name'>
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingresa tus apellidos'
                />
            </Form.Group>
            <Form.Group controlId='username'>
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingresa tu nombre de usuario'
                />
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Ingresa tu email'
                />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type='password'
                placeholder='Ingresa tu contraseña'
                />
            </Form.Group>
            <Form.Group controlId='confirm_password'>
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type='password'
                placeholder='Escribe de nuevo tu contraseña'
                />
            </Form.Group>
            <Form.Row className='d-flex justify-content-center'>
              <Button className='w-50'
                variant='primary'
                type='submit'>
                Registrarse
              </Button>
            </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterPage;
