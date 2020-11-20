import React from "react";
import { useUser } from "../../context/user-context";
import {Card, Button} from "react-bootstrap"
import pushups from "../../images/pushups.jpg"
import exerciseImg from "../../images/exerciseImg.png"
import RoutineCard from "../../components/RoutineCard/RoutineCard"
import Axios from "axios"

const HomePage = () => {
  const { user } = useUser();

  const fetchRoutine = async () => {
    const { data } = await Axios.get("/api/routines/1");
  }

  fetchRoutine();

  return (
    <>
    <h1>Bienvendio tu HomePage {user.id} </h1>
    <div className="d-flex flex-wrap ">
     
     <RoutineCard image={exerciseImg} ></RoutineCard>
     <RoutineCard image={pushups} ></RoutineCard>
     <RoutineCard image={exerciseImg} ></RoutineCard>
     <RoutineCard image={pushups} ></RoutineCard>
     <RoutineCard image={exerciseImg} ></RoutineCard>
   
    </div>
    </>
  );
};

export default HomePage;
