import React from "react";
import { useLocation } from "react-router-dom";
import BlockExercises from "../../components/BlockExercises/BlockExercises";

const RoutineDetailPage = () => {
  let location = useLocation();
  const routine = location.state.routine;

  return (
    <>
      <div
        className="text-primary-white mt-3 mb-3"
        style={{ borderBottom: "1px solid" }}
      >
        <h3>{routine.name}</h3>
      </div>
      <div
        style={{
          paddingLeft: "5rem",
          paddingRight: "5rem",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        {routine.blocks &&
          routine.blocks.map((block) => (
            <BlockExercises key={block.id} block={block}></BlockExercises>
          ))}
      </div>
    </>
  );
};

export default RoutineDetailPage;
