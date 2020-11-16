import React from "react";
import SideBar from "../../components/Sidebar/Sidebar";
import Main from "../../components/Main/Main";

const Dashboard = ({ children, myRoutineItem, newRoutineItem }) => {
  return (
    <div>
      <SideBar myRoutineItem={myRoutineItem} newRoutineItem={newRoutineItem}/>
      <Main content={children} ></Main>
    </div>
  );
};

export default Dashboard;
