import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlockExercises from "../../components/BlockExercises/BlockExercises";
import Axios from "axios";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";

const RoutineDetailPage = () => {
  const { idRoutine } = useParams();
  console.log(idRoutine);
  const [isLoading, setIsLoading] = useState(true);
  const [routineDetail, setRoutineDetail] = useState({});
  useEffect(() => {
    const fetchRoutineDetail = async () => {
      const { data } = await Axios.get(`/api/routines/${idRoutine}/`);
      setRoutineDetail(data);
      setIsLoading(false);
    };

    fetchRoutineDetail();
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
        <h3>{routineDetail.name}</h3>
      </div>
      <div
        style={{
          paddingLeft: "5rem",
          paddingRight: "5rem",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        {routineDetail.blocks &&
          routineDetail.blocks.map((block) => (
            <BlockExercises key={block.id} block={block}></BlockExercises>
          ))}
      </div>
    </>
  );
};

export default RoutineDetailPage;
