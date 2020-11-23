import React from "react";
import styled from "styled-components";
import { FaCog } from "@meronex/icons/fa";
import { useHistory } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useUser } from "../../../context/user-context";
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

const UserConfiIcon = styled(FaCog)`
  position: relative;
  left: 2rem;
  top: -1rem;
  color: #fff;
  opacity: 87%;

  background-color: ${(props) => (props.active ? "#000" : null)};
  border-bottom: ${(props) => (props.active ? "solid 1px #ff3b14" : null)};
  border-radius: ${(props) => (props.active ? "3px" : null)};
  &:hover {
    background-color: #000;
    border-bottom: solid 1px #ff3b14;
    border-radius: 3px;
  }
`;

const Profile = ({ changeItemSelected, active }) => {
  const { user } = useUser();
  let history = useHistory();

  const handleClickEditProfile = (e) => {
    history.push("/editProfile");
    changeItemSelected(false, false, true);
  };

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
      <UserConfiIcon
        size="1.2em"
        title="Configuración de usuario"
        onClick={handleClickEditProfile}
        active={active ? 1 : 0}
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
