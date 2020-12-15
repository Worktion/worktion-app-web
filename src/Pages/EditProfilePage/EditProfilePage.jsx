import React, { useState } from "react";
import { Container, Col, Button, Row, Form } from "react-bootstrap";
import Axios from "axios";
import { useUser } from "../../context/user-context";
import ImagePicker from "../../components/ImagePicker/ImagePicker";
import { useForm } from "react-hook-form";
import CustomModal from "../../components/CustomModal/CustomModal";

const EditProfilePage = () => {
  const [data, setData] = useState(null);
  const { user } = useUser();
  const { register, handleSubmit, errors } = useForm();

  const handleUpdateClick = (data) => {
    setData(data);
  };

  const updateUserInformation = async () => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("bio", data.bio);
    formData.append("birth_date", data.birth_date);
    data.cover[0] && formData.append("cover", data.cover[0]);

    try {
      await Axios.patch(`/api/users/${user.id}/`, formData);
      setData(null);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="vh-100 w-100 bg-black-background">
      <CustomModal
        active={data ? true : false}
        title={"Actualizar información"}
        body={"¿Seguro que desea guardar los cambios?"}
        handleAccept={updateUserInformation}
        handleClose={() => setData(null)}
      ></CustomModal>
      <Container className="pt-3">
        <h1 className="text-primary-white mb-3">Perfil</h1>
        <Row>
          <Col xs lg="4">
            <ImagePicker
              defaultImage={user.cover}
              register={register}
            ></ImagePicker>
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
                      defaultValue={user.first_name}
                      ref={register({
                        required: "Este campo es requerido",
                        maxLength: {
                          value: 50,
                          message: "Máximo número de caracteres alcanzado",
                        },
                        pattern: {
                          value: /[A-zÀ-ú]/,
                          message: "Nombre inválido",
                        },
                      })}
                    />
                    {errors.first_name && (
                      <span className="text-danger">
                        {errors.first_name.message}
                      </span>
                    )}
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
                      defaultValue={user.last_name}
                      ref={register({
                        required: "Este campo es requerido",
                        maxLength: {
                          value: 50,
                          message: "Máximo número de caracteres alcanzado",
                        },
                        pattern: {
                          value: /[A-zÀ-ú]/,
                          message: "Apellido inválido",
                        },
                      })}
                    />
                    {errors.last_name && (
                      <span className="text-danger">
                        {errors.last_name.message}
                      </span>
                    )}
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
                      defaultValue={user.username}
                      ref={register({
                        required: "Este campo es requerido",
                        maxLength: {
                          value: 40,
                          message: "Máximo número de caracteres alcanzado",
                        },
                      })}
                    />
                    {errors.username && (
                      <span className="text-danger">
                        {errors.username.message}
                      </span>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="emailControl">
                    <Form.Label className="text-primary-white">
                      Email
                    </Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                      defaultValue={user.email}
                      ref={register({
                        required: "Este campo es requerido",
                        maxLength: {
                          value: 100,
                          message: "Máximo número de caracteres alcanzado",
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Dirección de email inválida",
                        },
                      })}
                    />
                    {errors.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Group controlId="bio">
                <Form.Label className="text-primary-white">
                  Biografía
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="bio"
                  className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                  defaultValue={user.bio}
                  ref={register({
                    maxLength: {
                      value: 350,
                      message: "Máximo número de caracteres alcanzado",
                    },
                  })}
                />
              </Form.Group>
              <Form.Group
                style={{ display: "inline-grid" }}
                controlId="birthday"
              >
                <Form.Label className="text-primary-white">
                  Fecha Nacimiento
                </Form.Label>
                <Form.Control
                  as="input"
                  name="birth_date"
                  className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
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
