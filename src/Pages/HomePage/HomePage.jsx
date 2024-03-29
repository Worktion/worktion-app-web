import React, { useEffect, useState } from "react";
import RoutineCard from "../../components/RoutineCard/RoutineCard";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
import Axios from "axios";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import RoutineDetailModal from "../../components/RoutineDetailModal/RoutineDetailModal";

const StyledNavLink = styled.span`
  display: block;
  font-size: 1.5rem;
  border-bottom: ${(props) => (props.active ? "3px solid #ff3b14" : null)};
  opacity: ${(props) => (props.active ? null : "50%")};
  &:hover {
    opacity: ${(props) => (props.active ? null : "75%")};
    font-size: ${(props) => (props.active ? null : "1.49rem")};
  }
`;

const HomePage = () => {
  const [myRoutines, setMyRoutines] = useState({});
  const [shareRoutines, setShareRoutines] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();

  const [state, setState] = useState({
    tabMyRoutines: true,
    tabSharedWithMe: false,
  });

  useEffect(() => {
    fetchRoutines();
    fetchShareRoutines();
  }, []);

  const fetchRoutines = async () => {
    const { data } = await Axios.get("/api/routines/");
    setMyRoutines(data);
    setIsLoading(false);
  };

  const fetchShareRoutines = async () => {
    const { data } = await Axios.get("/api/share/routines/");
    setShareRoutines(data);
  };

  const handleRoutinesSelected = () => {
    setState({
      tabMyRoutines: true,
      tabSharedWithMe: false,
    });
  };

  const handleSharedSelected = () => {
    setState({
      tabMyRoutines: false,
      tabSharedWithMe: true,
    });
  };

  const showRoutineDetail = async (routine) => {
    history.push(`/routineDetail/${routine.id}`);
  };

  const removeRoutine = (routine) => {
    const newRoutines = myRoutines.filter(
      (element) => element.id != routine.id
    );
    setMyRoutines(newRoutines);
  };

  const showMyRoutinesCreated = () => {
    return (
      <div className="d-flex flex-wrap">
        {myRoutines.map((routine) => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            handleShowDetail={showRoutineDetail}
            removeRoutine={removeRoutine}
          ></RoutineCard>
        ))}
      </div>
    );
  };

  const showSharedWithMe = () => {
    return (
      <div className="d-flex flex-wrap">
        {shareRoutines.map((share) => (
          <RoutineCard
            key={share.routine.id}
            routine={share.routine}
            user={share.owner}
            handleShowDetail={showRoutineDetail}
            isShared={true}
          ></RoutineCard>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <SpinnerLoading></SpinnerLoading>;
  }

  return (
    <>
      <Nav justify variant="tabs text-primary-white border-0 mt-3">
        <Nav.Item>
          <StyledNavLink
            role="button"
            onClick={handleRoutinesSelected}
            active={state.tabMyRoutines ? 1 : 0}
          >
            Rutinas creadas
          </StyledNavLink>
        </Nav.Item>
        <Nav.Item>
          <StyledNavLink
            role="button"
            onClick={handleSharedSelected}
            active={state.tabSharedWithMe ? 1 : 0}
          >
            Compartidos conmigo
          </StyledNavLink>
        </Nav.Item>
      </Nav>

      {state.tabMyRoutines ? showMyRoutinesCreated() : showSharedWithMe()}
    </>
  );
};

export default HomePage;
