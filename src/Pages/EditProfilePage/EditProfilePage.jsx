import React from "react";
import { Container, Col, Button, Row, Form } from "react-bootstrap";
import { useUser } from "../../context/user-context";
import ReactRoundedImage from "react-rounded-image";
import defaultProfileImg from "../../images/defaultProfileImg.png";
import { useForm } from "react-hook-form";
import Axios from "axios";
const EditProfilePage = () => {
  const { user } = useUser();

  const { register, handleSubmit, getValues, errors } = useForm();

  const handleUpdateClick = async (data) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("bio", data.bio);
    formData.append("birth_date", data.birth_date);
    data.cover[0] && formData.append("cover", data.cover[0]);

    try {
      console.log("Enviando request");
      await Axios.patch("/api/users/2/", formData);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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
            <div className="d-flex mt-3 text-primary-white">
              <Form.File name="cover" id="formControlFile" ref={register} />
            </div>
          </Col>
          <Col>
            <Form className="w-100" onSubmit={handleSubmit(handleUpdateClick)}>
              <Form.Row>
                <Col>
                  <Form.Group controlId="first_name">
                    <Form.Label className="text-primary-white">
                      Nombre
                    </Form.Label>
                    <Form.Control
                      name="first_name"
                      className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                      plaintext
                      defaultValue={user.first_name}
                      ref={register}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="last_name">
                    <Form.Label className="text-primary-white">
                      Apellidos
                    </Form.Label>
                    <Form.Control
                      name="last_name"
                      className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                      plaintext
                      defaultValue={user.last_name}
                      ref={register}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="username">
                    <Form.Label className="text-primary-white">
                      Usuario
                    </Form.Label>
                    <Form.Control
                      name="username"
                      className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                      plaintext
                      defaultValue={user.username}
                      ref={register}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="emailControl">
                    <Form.Label className="text-primary-white">
                      Email
                    </Form.Label>
                    <Form.Control
                      name="email"
                      className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                      plaintext
                      defaultValue={user.email}
                      ref={register}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Group controlId="bio">
                <Form.Label className="text-primary-white">
                  Bibliografía
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="bio"
                  className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                  plaintext
                  defaultValue={user.bio}
                  ref={register}
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="birthday">
                <Form.Label className="text-primary-white">
                  Fecha Nacimiento
                </Form.Label>
                <Form.Control
                  as="input"
                  name="birth_date"
                  className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                  plaintext
                  type="date"
                  defaultValue={user.birth_date}
                  ref={register}
                />
              </Form.Group>
              <Form.Row className="d-flex justify-content-center">
                <Button
                  className="w-50"
                  variant="outline-success"
                  type="submit"
                >
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
