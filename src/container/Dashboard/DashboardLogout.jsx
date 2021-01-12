import React, { useState, useEffect } from "react";
import SidebarLogout from "../../components/Sidebar/SidebarLogout";
import Main from "../../components/Main/Main";
import { useParams } from "react-router-dom";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";
import Axios from "axios";

const DashboardLogout = ({ children }) => {
  const { idRoutine } = useParams();
  const [routine, setRoutine] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoutinePublic = async () => {
      try {
        const { data } = await Axios.get(`/api/share/public/${idRoutine}/`);
        setRoutine(data);
      } catch (error) {
        setRoutine(false);
      }
      setIsLoading(false);
    };
    fetchRoutinePublic();
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <div>
      <SidebarLogout user={routine.owner} />
      <Main content={children}></Main>
    </div>
  );
};

export default DashboardLogout;
