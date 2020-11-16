import React from "react";
import styled from "styled-components";
import profilelg from "../../../images/profilelg.png";
import { FaUserCog } from "react-icons/fa";
import { useUser } from "../../../context/user-context";

const Container = styled.div`
  margin-top: 1rem;
`;

const ProfileImg = styled.img`
  height: 5rem;
`;
const ProfileName = styled.h1`
  font-size: 1rem;
  font-weight: 300;
  color: #fff;
  opacity: 90%;
`;

const UserConfiIcon = styled(FaUserCog)`
  position: absolute;
  margin-left: -8rem;
  margin-top: 4.9rem;
  border-radius: 0.3rem;
  color: #fff;
  opacity: 87%;
  &:hover {
    background-color: #000;
  }
`;

const Profile = () => {
  const { user } = useUser();
  return (
    <Container>
      <ProfileImg src={profilelg} />
      <span>
        <UserConfiIcon size="1.2em" title="Configuración de usuario" />
        <ProfileName>{user.username}</ProfileName>
      </span>
    </Container>
  );
};

export default Profile;
