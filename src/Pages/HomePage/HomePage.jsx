import React, { useEffect, useState } from "react";
import RoutineCard from "../../components/RoutineCard/RoutineCard";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
import Axios from "axios";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
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
  const [isLoading, setIsLoading] = useState(true);
  const [showDetail, setShowDetail] = useState(null);
  const [state, setState] = useState({
    tabMyRoutines: true,
    tabSharedWithMe: false,
  });

  useEffect(() => {
    const fetchRoutines = async () => {
      const { data } = await Axios.get("/api/routines/");
      setMyRoutines(data);
      setIsLoading(false);
      console.log(data)
    };

    fetchRoutines();
  }, []);

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

  const closeDetail = () => {
    setShowDetail(false);
  };

  const showRoutineDetail = (routine) => {
    setShowDetail(routine);
  };

  const showMyRoutinesCreated = () => {
    return (
      <div className="d-flex flex-wrap">
        {myRoutines.map((routine) => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            handleShowDetail={showRoutineDetail}
            handleClose={closeDetail}
            
          ></RoutineCard>
        ))}
      </div>
    );
  };

  const showSharedWithMe = () => {
    return <h1 style={{ color: "#fff" }}>Rutinas compartidas conmigo</h1>;
  };

  if (isLoading) {
    return <SpinnerLoading></SpinnerLoading>;
  }

  return (
    <>
      {showDetail && (
        <RoutineDetailModal
          show={showDetail ? true : false}
          handleClose={closeDetail}
          routine={showDetail ? showDetail : null}
        ></RoutineDetailModal>
      )}

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
            Rutinas que me comparten
          </StyledNavLink>
        </Nav.Item>
      </Nav>

      {state.tabMyRoutines ? showMyRoutinesCreated() : showSharedWithMe()}
    </>
  );
};

export default HomePage;
