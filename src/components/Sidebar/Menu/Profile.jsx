import React from "react";
import styled from "styled-components";
import profilelg from "../../../images/profilelg.png";
import { FaCog } from "react-icons/fa";
import { useUser } from "../../../context/user-context";
import ReactRoundedImage from "react-rounded-image";
import { useHistory } from "react-router-dom";

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
  opacity: 90%;
  text-align: center;
`;

const UserConfiIcon = styled(FaCog)`
  position: absolute;
  margin-right: 10rem;
  border-radius: 0.3rem;
  color: #fff;
  opacity: 87%;
  &:hover {
    background-color: #000;
    height: 1.35rem;
    width: 1.35rem;
  }
`;

const Profile = () => {
  const { user } = useUser();
  let history = useHistory();

  const handleClickEditProfile = (e) => {
    history.push("/editProfile");
  };

  return (
    <Container>
      <ReactRoundedImage
        image={profilelg}
        roundedSize="0"
        imageWidth="90"
        imageHeight="90"
      />
      <UserConfiIcon
        size="1.2em"
        title="Configuración de usuario"
        onClick={handleClickEditProfile}
      />
      {user.username.length <= 20 ? (
        <ProfileName>{user.username}</ProfileName>
      ) : (
        <ProfileName>{user.username.substr(0, 20) + "..."}</ProfileName>
      )}
    </Container>
  );
};

export default Profile;
