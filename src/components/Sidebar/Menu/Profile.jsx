import React from "react";
import styled from "styled-components";
import profilelg from "../../../images/profilelg.png";

const Container = styled.div`
  margin-top: 5rem;
`;

const ProfileImg = styled.img`
  height: 5rem;
`;
const ProfileName = styled.h1`
  font-size: 1rem;
  font-weight: 300;
  
`;

const Profile = () => {
  return (
    <Container>
      <ProfileImg src={profilelg} />
      <ProfileName>Scott Grant</ProfileName>
    </Container>
  );
};

export default Profile;
