import React from "react";
import { Row, Col } from "react-bootstrap";
import defaultProfileImg from "../../images/defaultProfileImg.png";

const SearchUsersItem = ({ user, handleSelectUser }) => {
  return (
    <>
      <Row onDoubleClick={() => handleSelectUser(user)} className="mb-2">
        <Col lg>
          <Row>
            <img
              src={user.cover ? user.cover : defaultProfileImg}
              alt="Imagen usuario"
              style={{ width: "50px", height: "50px" }}
              title={user.email}
              className="rounded-circle"
            />
            <Col>
              <p className="m-0">{user.username}</p>
              <p className="m-0">{user.email}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default SearchUsersItem;
