import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const UserOccupantItem = ({ user, handleRemoveOccupant }) => {
    return (
        <>
            <Row className="mb-2">
                <Col lg>
                    <Row>
                        <img
                            src={user.occupant.cover}
                            alt="Imagen usuario"
                            style={{ width: "50px", height: "50px" }}
                            title={user.occupant.email}
                            className="rounded-circle" 
                        />
                        <Col>
                            <p className="m-0">{user.occupant.username}</p>
                            <p className="m-0">{user.occupant.email}</p>
                        </Col>
                    </Row>

                </Col>
                <Col xs="auto">
                    <Button size="sm" variant="secondary">Quitar usuario</Button>
                </Col>
            </Row>
        </>
    );
}

export default UserOccupantItem;