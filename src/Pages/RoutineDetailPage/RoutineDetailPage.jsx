import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlockExercises from "../../components/BlockExercises/BlockExercises";
import Axios from "axios";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
import { RiFireFill, RiTimeFill } from "@meronex/icons/ri";
import moment from "moment";
import * as constants from "../../constants/constants";
import { Container, Col, Row, Form, Image } from "react-bootstrap";
import defaultRoutineImage from "../../images/defaultRoutineImage.jpg";
import LogoWorktion from "../../images/LogoWorktion.png";

const RoutineDetailPage = () => {
  const { idRoutine } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [routineDetail, setRoutineDetail] = useState({});
  useEffect(() => {
    const fetchRoutineDetail = async () => {
      try {
        const { data } = await Axios.get(`/api/routines/${idRoutine}/`);
        setRoutineDetail(data);
      } catch (error) {
        setRoutineDetail(false);
      }
      setIsLoading(false);
    };

    fetchRoutineDetail();
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (!routineDetail) {
    return (
      <div className="h-100 d-flex flex-column justify-content-center align-items-center text-primary-white">
      <Image src={LogoWorktion}></Image>
        <h1>No se ha encontrado la rutina 😔 </h1>

      </div>
    );
  }

  return (
    <>
      <div
        className="text-primary-white mt-3 mb-3"
        style={{ borderBottom: "1px solid" }}
      >
        <h3>{routineDetail.name}</h3>
      </div>
      <div>
        <Container className="mt-5">
          <Row>
            <Col xs lg="3">
              <Image
                src={
                  routineDetail.cover
                    ? routineDetail.cover
                    : defaultRoutineImage
                }
                alt="Imagen de la rutina"
                style={{
                  height: "175px",
                  width: "175px",
                }}
                className="rounded"
              ></Image>
            </Col>
            <Col>
              <Form.Row>
                <Col className="col-lg-6">
                  <Form.Group controlId="description">
                    <Form.Label className="text-primary-white">
                      Descripción
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      placeholder="Ingrese la descripción"
                      className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                      disabled={true}
                      defaultValue={routineDetail.description}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="text-primary-white">
                      Grupo muscular
                    </Form.Label>
                    <Form.Control
                      name="muscleGroup"
                      className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                      disabled={true}
                      style={{ maxWidth: "150px" }}
                      defaultValue={
                        constants.muscleGroups[routineDetail.muscle_group]
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <div className="d-flex flex-column">
                    <div className="d-inline-flex align-items-center col-lg-6">
                      <RiFireFill
                        size="1.2rem"
                        className="text-primary-white mr-1"
                        style={{ alignSelf: "center", marginTop: "0.6rem" }}
                      ></RiFireFill>
                      <div className="d-flex flex-column">
                        <Form.Group>
                          <Form.Label className="text-primary-white">
                            Dificultad
                          </Form.Label>
                          <Form.Control
                            name="difficult"
                            className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                            disabled={true}
                            style={{ maxWidth: "120px" }}
                            defaultValue={
                              constants.routineDifficulties[
                                routineDetail.dificulty
                              ]
                            }
                          />
                        </Form.Group>
                      </div>
                    </div>

                    <div className="d-inline-flex align-items-center col-lg-6">
                      <RiTimeFill
                        size="1.2rem"
                        className="text-primary-white mr-1"
                        style={{ alignSelf: "center", marginTop: "0.6rem" }}
                      ></RiTimeFill>
                      <Form.Group
                        controlId="routineTime"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Form.Label className="text-primary-white">
                          Duración
                        </Form.Label>
                        <Form.Control
                          name="routineTime"
                          className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                          disabled={true}
                          style={{ maxWidth: "120px" }}
                          defaultValue={moment
                            .utc(routineDetail.time * 1000)
                            .format("HH:mm:ss")}
                        />
                      </Form.Group>
                    </div>
                  </div>
                </Col>
              </Form.Row>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        style={{
          paddingLeft: "5rem",
          paddingRight: "5rem",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        {routineDetail.blocks &&
          routineDetail.blocks.map((block) => (
            <BlockExercises key={block.id} block={block}></BlockExercises>
          ))}
      </div>
    </>
  );
};

export default RoutineDetailPage;
