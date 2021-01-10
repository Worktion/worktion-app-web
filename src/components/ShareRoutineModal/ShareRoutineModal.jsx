import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Modal, InputGroup, FormControl, Row, Button, Col } from "react-bootstrap"
import UserOccupantItem from "./UserOccupantItem";

const ShareRoutineModal = ({ show, handleClose, routine }) => {
    const [occupants, setOccupants] = useState([]);
    const [publicRoutine, setPublicRoutine] = useState(null);
    const [query, setQuery] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fecthOccupants();
        fecthPublicRoutine();
    }, []);

    useEffect(() => {
        fecthUsers();
    }, [query]);

    const handleChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    };
    const fecthUsers = async () => {
        const { data } = await Axios.get("/api/users?search=" + query);
        setUsers(data);
        console.log(data);
      };
    const fecthOccupants = async () => {
        const { data } = await Axios.get("/api/share/routines/" + routine.id + "/occupants/");
        setOccupants(data);
        console.log(data);
    };
    const fecthPublicRoutine = async () => {
        try{
            const { data } = await Axios.get("/api/share/public/routine/" + routine.id + "/");
            setPublicRoutine(data);
            console.log(data);
        } catch(error){
            setPublicRoutine(null);
            console.log(error);
        }
        
    };

    return (
        <>
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                className="text-primary-white"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Compartir</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-md">
                        <h4>Compartida con otros usuarios</h4>
                        <Row>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">Usuario</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="usuario@gmail.com"
                                    value={query ? query : ""}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </Row>
                        <div className="container overflow-auto h-auto">
                            {occupants.length == 0 ? (
                                <p>No hay usuarios compartiendo</p>
                            ):(
                                occupants.map((user) =>(
                                    <UserOccupantItem
                                        key={user.id}
                                        user={user}
                                    ></UserOccupantItem>
                                ))
                            )}
                        </div>

                    </div>
                    <div className="container-md">
                        <h4>Compartida publicamente</h4>
                        {publicRoutine == null ? (
                            <p>No se ha compartido</p>
                        ) : (
                            <>
                            <Row>
                                <Col lg>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">Link</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            value={"https://worktion.com/public/routines/" + publicRoutine.id}
                                            readOnly
                                        />
                                    </InputGroup>

                                </Col>
                                <Col xl="auto">
                                    <Button variant="link">Copiar</Button>
                                </Col>
                            </Row>
                            <Button size="sm" variant="secondary">Dejar de compartir</Button>
                            </>
                            

                        )}


                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
}


export default ShareRoutineModal;