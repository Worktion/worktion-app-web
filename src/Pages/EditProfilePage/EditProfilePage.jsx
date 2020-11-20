import React from "react";
import { Container, Col, Button, Row, Form } from "react-bootstrap";
import { useUser } from "../../context/user-context";
import ReactRoundedImage from "react-rounded-image";
import defaultProfileImg from "../../images/defaultProfileImg.png"

const EditProfilePage = () => {
  const { user } = useUser();

  return (
    <div className="vh-100 w-100 bg-black-background">
      <Container className="pt-3">
        <h1 className="text-primary-white mb-3">Perfil</h1>
        <Row>
          <Col xs lg="3">
            <div className="d-flex justify-content-center">
              <ReactRoundedImage
                image={user.cover ? user.cover : defaultProfileImg}
                roundedSize="0"
                imageWidth="200"
                imageHeight="200"
              />

            </div>
            <div className="d-flex justify-content-center mt-3">
              <Button variant="outline-light">Cargar imagen</Button>

            </div>
          </Col>
          <Col >
            <Form className="w-100">
              <Form.Row>
                <Col>
                  <Form.Group controlId='first_name' >
                    <Form.Label className="text-primary-white">Nombre</Form.Label>
                    <Form.Control
                      className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                      plaintext readOnly defaultValue={user.first_name}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='last_name'>
                    <Form.Label className="text-primary-white">Apellidos</Form.Label>
                    <Form.Control
                      className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                      plaintext readOnly defaultValue={user.last_name}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId='username'>
                    <Form.Label className="text-primary-white">Usuario</Form.Label>
                    <Form.Control
                      className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                      plaintext readOnly defaultValue={user.username}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='email'>
                    <Form.Label className="text-primary-white">Email</Form.Label>
                    <Form.Control
                      className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                      plaintext readOnly defaultValue={user.email}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Group controlId='bio'>
                <Form.Label className="text-primary-white">Bibliografía</Form.Label>
                <Form.Control as="textarea" 
                  className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                  plaintext readOnly defaultValue={user.bio}
                />
              </Form.Group>
              <Form.Group as={Col} md="3"  controlId='birthday'>
                <Form.Label className="text-primary-white">Fecha Nacimiento</Form.Label>
                <Form.Control as="input" 
                  className="bg-primary-surface-8dp text-primary-white border-0 pl-2" 
                  plaintext type="date" readOnly defaultValue={user.birth_date}
                />
              </Form.Group>
              <Form.Row className='d-flex justify-content-center'>
                <Button className='w-50'
                  variant="outline-success"
                  type='submit'>
                  Actualizar
              </Button>
              </Form.Row>
            </Form>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default EditProfilePage;
