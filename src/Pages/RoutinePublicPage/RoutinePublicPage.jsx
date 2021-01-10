import React, { useState, useEffect } from "react";
import { RiFireFill, RiTimeFill } from "@meronex/icons/ri";
import moment from "moment";
import { Container, Col, Row, Form, Image } from "react-bootstrap";
import * as constants from "../../constants/constants";
import BlockExercises from "../../components/BlockExercises/BlockExercises";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
import Axios from "axios";
import { useParams } from "react-router-dom";

const RoutinePublicPage = () => {
  const [routine, setRoutine] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { idRoutine } = useParams();

  useEffect(() => {
    const fetchRoutinePublic = async () => {
      try {
        const { data } = await Axios.get(`/api/share/public/${idRoutine}/`);
        setRoutine(data.routine);
      } catch (error) {
        setRoutine(false);
      }
      setIsLoading(false);
    };
    fetchRoutinePublic();
  }, []);


  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <>
      <div
        className="text-primary-white mt-3 mb-3"
        style={{ borderBottom: "1px solid" }}
      >
        <h3>{routine.name}</h3>
      </div>

      <div>
        <Container className="mt-5">
          <Row>
            <Col xs lg="3">
              <Image
                src={routine.cover}
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
                      style={{maxHeight: "115px"}}
                      className="bg-primary-surface-8dp text-primary-white border-0 pl-2"
                      disabled={true}
                      defaultValue={routine.description}
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
                        constants.muscleGroups[routine.muscle_group]
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
                              constants.routineDifficulties[routine.dificulty]
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
                            .utc(routine.time * 1000)
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
        {routine.blocks &&
          routine.blocks.map((block) => (
            <BlockExercises key={block.id} block={block}></BlockExercises>
          ))}
      </div>
    </>
  );
};

export default RoutinePublicPage;
