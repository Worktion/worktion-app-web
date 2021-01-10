import React from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";
import defaultProfileImg from "../../../images/defaultProfileImg.png";

const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileName = styled.h1`
  font-size: 1rem;
  font-weight: 300;
  color: #fff;
  opacity: 87%;
  text-align: center;
`;

const ProfilePublic = ({ user }) => {
  return (
    <Container>
      <Image
        src={user.cover ? user.cover : defaultProfileImg}
        alt="Foto de perfil"
        style={{
          height: "90px",
          width: "90px",
        }}
        roundedCircle
      />
      <ProfileName>
        Creador
      </ProfileName>
      {user.username.length <= 20 ? (
        <ProfileName>{user.username}</ProfileName>
      ) : (
        <ProfileName>{user.username.substr(0, 20) + "..."}</ProfileName>
      )}
    </Container>
  );
};

export default ProfilePublic;
