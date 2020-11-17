import React from "react";
import styled from "styled-components";
import { FaCog } from "react-icons/fa";
import { useUser } from "../../../context/user-context";
import ReactRoundedImage from "react-rounded-image";
import { useHistory } from "react-router-dom";
import defaultProfileImg from "../../../images/defaultProfileImg.png"

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
  color: #fff;
  opacity: 87%;

  background-color: ${(props) => (props.active ? "#000" : null)};
  width: ${(props) => (props.active ? "1.35rem" : null)};
  height: ${(props) => (props.active ? "1.35rem" : null)};
  border-bottom: ${(props) => (props.active ? "solid 1px #ff3b14" : null)};
  &:hover {
    background-color: #000;
    height: 1.35rem;
    width: 1.35rem;
    border-bottom: solid 1px #ff3b14;
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
      <ReactRoundedImage
        image={user.cover ? user.cover : defaultProfileImg}
        roundedSize="0"
        imageWidth="90"
        imageHeight="90"
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
