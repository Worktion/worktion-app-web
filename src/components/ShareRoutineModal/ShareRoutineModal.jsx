import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Modal, InputGroup, FormControl, Row, Button, Col } from "react-bootstrap"
import UserOccupantItem from "./UserOccupantItem";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
import SearchUsersModal from "./SearchUsersModal";

const ShareRoutineModal = ({ show, handleClose, routine }) => {
    const [occupants, setOccupants] = useState([]);
    const [publicRoutine, setPublicRoutine] = useState(null);
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        fecthOccupants();
        fecthPublicRoutine();
        setIsLoading(true);
    }, []);


    const fecthOccupants = async () => {
        const { data } = await Axios.get("/api/share/routines/" + routine.id + "/occupants/");
        setOccupants(data);
        setIsLoading(false);
    };
    const fecthPublicRoutine = async () => {
        try {
            const { data } = await Axios.get("/api/share/public/routine/" + routine.id + "/");
            setPublicRoutine(data);
        } catch (error) {
            setPublicRoutine(null);
        }
    };
    const fecthDeleteOccupant = async (user) => {
        try {
            const path = "/api/share/routines/" + routine.id + "/occupants/" + user.id + "/";
            const { res } = await Axios.delete(path);
            return true;
        } catch (error) {
            return false;
        }
    };
    const fecthDeleteSharePublicRoutine = async (idPublicRoutine) => {
        try {
            const path = "api/share/public/" + idPublicRoutine + "/";
            const { res } = await Axios.delete(path);
            return true;
        } catch (error) {
            return false;
        }
    };

    const fecthCreatePublicLink = async (idRoutine) => {
        try {
            const request = {
                routine_id: idRoutine,
            }
            const { data } = await Axios.post("/api/share/public/", request);
            setPublicRoutine(data);
        } catch (error) {
        }
    };
    const fecthShareRoutineToOccupant = async (idRoutine, email) => {
        try {
            const request = {
                routine_id: idRoutine,
                occupant_email: email,
            }
            const { data } = await Axios.post("/api/share/routines/", request);
            fecthOccupants();
            return true;
        } catch (error) {
            return false;
        }
    };

    const deleteOccupant = (user) => {
        if (fecthDeleteOccupant(user)) {
            const newOccupants = occupants.filter(
                (occupant) => occupant.id != user.id
            );
            setOccupants(newOccupants);
        }
    };

    const leftToSharePublicRoutine = () => {
        if (publicRoutine != null) {
            if (fecthDeleteSharePublicRoutine(publicRoutine.id)) {

                setPublicRoutine(null);
            }
        }
    };
    const createPublicLink = () => {
        fecthCreatePublicLink(routine.id);
    };

    const addNewOccupant = (user) =>{
        if(fecthShareRoutineToOccupant(routine.id, user.email)){
            console.log("Compartiendo rutina a: "+ user.email);
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
                        <Row className="justify-content-end">
                            <Row className="m-3 ">
                                <SearchUsersModal
                                    handleAddOccupant={addNewOccupant}>

                                </SearchUsersModal>

                            </Row>
                        </Row>
                        <div className="container overflow-auto h-auto">
                            {isLoading ? (
                                <SpinnerLoading></SpinnerLoading>
                            ) : (
                                    occupants.length == 0 ? (
                                        <p className="m-3">Esta rutina no ha sido compartida con nadie</p>
                                    ) : (
                                            occupants.map((user) => (
                                                <UserOccupantItem
                                                    key={user.id}
                                                    user={user}
                                                    handleRemoveOccupant={deleteOccupant}
                                                ></UserOccupantItem>
                                            ))
                                        )

                                )}
                        </div>

                    </div>
                    <div className="container-md">
                        <h4>Compartida publicamente</h4>
                        {publicRoutine == null ? (
                            <Row>
                                <Button onClick={createPublicLink}
                                    className="m-3" size="sm" variant="primary">
                                    Generar link compartido
                                </Button>
                            </Row>
                        ) : (
                                <>
                                    <Row>
                                        <Col lg>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text id="basic-addon1">Link</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl
                                                    value={"https://localhost:3000/public/routine/" + publicRoutine.id}
                                                    readOnly
                                                />
                                            </InputGroup>

                                        </Col>
                                        <Col xl="auto">
                                            <Button variant="link">Copiar</Button>
                                        </Col>
                                    </Row>
                                    <Button onClick={leftToSharePublicRoutine}
                                        size="sm" variant="secondary">Dejar de compartir</Button>
                                </>
                            )}


                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
}


export default ShareRoutineModal;