import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import SearchUserItem from "./SearchUserItem";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";

const SearchUsersModal = ({ handleAddOccupant }) => {
    const [mShow, setShow] = useState(false);
    const [query, setQuery] = useState(null);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };

    useEffect(() => {
        fecthUsers();
    }, [query]);

    const handleChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
        setIsLoading(true);
    };

    const fecthUsers = async () => {
        const { data } = await Axios.get("/api/users?search=" + query);
        setUsers(data);
        setIsLoading(false);
    };

    const addUser = (occupant) => {
        handleAddOccupant(occupant);
        setShow(false);
    };

    return (
        <>
            <Button
                size="m"
                variant="primary"
                // variant="primary-surface-8dp text-primary-white"
                onClick={handleShow}
            >
                Compartir a usuario
            </Button>

            <Modal
                size="m"
                centered
                show={mShow}
                onHide={handleClose}
                dialogClassName="modal-search-exercise"
                className="text-primary-white"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="">Bucar usuarios</Modal.Title>
                </Modal.Header>
                <Modal.Body className="">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Buscar</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="usuario@ejemplo.com"
                            value={query ? query : ""}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <div style={{ height: "230px" }} className="container overflow-auto">
                        {isLoading ? (
                            <SpinnerLoading></SpinnerLoading>
                        ) : (
                            users.map((user) => (
                                    <SearchUserItem
                                        key={user.id}
                                        user={user}
                                        handleSelectUser={addUser}
                                    ></SearchUserItem>
                                ))
                            )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SearchUsersModal;
