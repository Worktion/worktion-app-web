import React from "react";
import SideBar from "../Sidebar/Sidebar";
import HomePage from "../../Pages/HomePage/HomePage";
import { Container } from "react-bootstrap";

const Dashboard = ({children}) => {
  return (
    <div>
      <Container>
        <SideBar />
        {children}
      </Container>
    </div>
  );
};

export default Dashboard;
