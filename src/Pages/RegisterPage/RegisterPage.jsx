import React from 'react';
import { Form, Button, Card, Container, Navbar } from 'react-bootstrap';
import CustomAlert from "../../components/Alert/CustomAlert";
import { useUser } from '../../context/user-context';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const RegisterPage = () => {
  const history = useHistory();
  const {signup, login} = useUser()
  const { register, handleSubmit, getValues , errors } = useForm();

  const [alert, setAlert] = useState({
    message:'',
    type:'',
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

  const handleSignupClick = async (data) =>{
    try{
      await signup(data);
      showAlert('Te has registrado exitosamente, ahora inicia sesión :)',"success");
      await sleep(2000);
      history.push("/login");
    } catch(error){
      console.log(String(error));
      if(error.data.email){
        showAlert('El email ya ha sido registrado',"danger");
      }
      if(error.data.username){
        showAlert('El nombre de usuario ya existe',"danger");
      }
    }
  };


  return (
    <div>
      <Navbar expand="lg" variant="dark justify-content-center" bg="primary">
        <Navbar.Text className="h2 text-white" href="#">
          Worktion
        </Navbar.Text>
      </Navbar>
      <CustomAlert
        variant={alert.type}
        content={alert.message}
        closeError={closeError}
      ></CustomAlert>
      <Container className='d-flex justify-content-center w-50 mt-2 mb-5'>
        <Card className='w-75'>
          <Card.Header as='h5'>Registro</Card.Header>
          <Card.Body >
            <Form onSubmit={handleSubmit(handleSignupClick)}>
            <Form.Group controlId='first_name' >
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name='first_name'
                type='text'
                placeholder='Ingresa tu nombre'
                ref={register({ 
                  required: "Este campo es requerido", 
                  maxLength:{
                    value:40,
                    message:"Solo se permiten 40 carácteres"
                  } 
                })}
                />
              {errors.first_name && <span className='text-danger'>{errors.first_name.message}</span>}
            </Form.Group>

            <Form.Group controlId='last_name'>
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                name='last_name'
                type='text'
                placeholder='Ingresa tus apellidos'
                ref={register({ 
                  required: "Este campo es requerido", 
                  maxLength:{
                    value:40,
                    message:"Solo se permiten 40 carácteres"
                  } 
                })}
                />
              {errors.last_name && <span className='text-danger'>{errors.last_name.message}</span>}
            </Form.Group>
            <Form.Group controlId='username'>
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                name='username'
                type='text'
                placeholder='Ingresa tu nombre de usuario'
                ref={register({ 
                  required: "Este campo es requerido", 
                  maxLength:{
                    value:40,
                    message:"Solo se permiten 40 carácteres"
                  } 
                })}
                />
                {errors.username && <span className='text-danger'>{errors.username.message}</span>}
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
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
            <Form.Group controlId='password'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name='password'
                type='password'
                placeholder='Ingresa tu contraseña'
                ref={register({ 
                  required: "Este campo es requerido", 
                  minLength:{
                    value:8,
                    message:"La contraseña debe contener mínimo 8 carácteres"
                  } 
                })}
                />
              <Form.Text className="text-muted">
                Las contraseña debe de ser de al menos 8 carácteres
              </Form.Text>
              {errors.password && <span className='text-danger'>{errors.password.message}</span>}
            </Form.Group>
            <Form.Group controlId='confirm_password'>
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
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
