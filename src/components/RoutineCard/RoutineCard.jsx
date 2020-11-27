import React from "react";
import { Card, DropdownButton, Dropdown, Row } from "react-bootstrap";
import { FaLockOpen, FaLock, FaUserCircle } from "@meronex/icons/fa";
import { RiFireFill, RiTimeFill } from "@meronex/icons/ri";
import { BiDumbbell } from "@meronex/icons/bi";
import * as constants from "../../constants/constants";
import moment from "moment";
import styled from "styled-components";

const StyledDropDownButton = styled(DropdownButton)`
  &:hover {
    box-shadow: 0 0 0 0.3px grey;
    border-radius: 30%;
  }
`;

const IconSpan = ({ icon, content, marginBottom }) => {
  return (
    <span className={`d-flex align-items-center ${marginBottom}`}>
      {icon}
      {content}
    </span>
  );
};

const RoutineCard = ({ routine, user, handleShowDetail }) => {
  return (
    
    <Card
      className="bg-white-with-opacity text-primary-white shadow"
      style={{ width: "20rem", margin: "1rem", borderRadius: "3%" }}
    >
      <Card.Img
        style={{ height: "20vh", objectFit: "cover" }}
        variant="top"
        src={routine.cover}
      />
      <Card.Body>
        <Row className="m-auto">
          <Card.Title className="mb-0">
            {routine.name.length <= 25
              ? routine.name
              : routine.name.substr(0, 25) + "..."}
          </Card.Title>
          <StyledDropDownButton
            className="ml-auto"
            id="dropdownRoutineOptions"
            title=""
            variant="transparent text-primary-white border-0 btn-toogle-down"
          >
            <Dropdown.Item>Editar rutina</Dropdown.Item>
            <Dropdown.Item onClick={() => handleShowDetail(routine)}>
              Ver detalle de rutina
            </Dropdown.Item>
            <Dropdown.Item>Compartir rutina</Dropdown.Item>
          </StyledDropDownButton>
        </Row>

        {user && (
          <IconSpan
            icon={<FaUserCircle className="mr-2" size="1.2rem" />}
            marginBottom="mb-3"
            content={user.username}
          />
        )}
        {routine.is_public ? (
          <IconSpan
            icon={<FaLockOpen className="mr-2" size="1.2rem" />}
            content={constants.routinesState.isPublic}
          />
        ) : (
          <IconSpan
            icon={<FaLock className="mr-2" size="1.2rem" />}
            content={constants.routinesState.isPrivate}
          />
        )}
        <IconSpan
          icon={<BiDumbbell className="mr-2" size="1.2rem" />}
          content={constants.muscleGroups[routine.muscle_group]}
        />
        <IconSpan
          icon={<RiFireFill className="mr-2" size="1.2rem" />}
          content={constants.routineDifficulties[routine.dificulty]}
        />
        <IconSpan
          icon={<RiTimeFill className="mr-2" size="1.2rem" />}
          content={moment.utc(routine.time * 1000).format("HH:mm:ss")}
        />
      </Card.Body>
    </Card>
  );
};

export default RoutineCard;
