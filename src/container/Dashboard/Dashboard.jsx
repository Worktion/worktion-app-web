import React from "react";
import SideBar from "../../components/Sidebar/Sidebar";
import Main from "../../components/Main/Main";

const Dashboard = ({ children }) => {
  return (
    <div>
      <SideBar />
      <Main content={children}></Main>
    </div>
  );
};

export default Dashboard;
