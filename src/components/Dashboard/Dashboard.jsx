import React from "react";
import SideBar from "../Sidebar/Sidebar";
import HomePage from "../../Pages/HomePage/HomePage";
import { Container, Row } from "react-bootstrap";

const Dashboard = () => {
  return (
    <div>
      <Container>
        <SideBar />
        <HomePage></HomePage>
      </Container>
    </div>
  );
};

export default Dashboard;
