import React from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import logo from "../../images/loginImage.png";
import { useUser } from "../../context/user-context";
function LoginPage() {
  const { loadUser, user, login } = useUser();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        backgroundImage: `url(${logo})`,
      }}
    >
      <h1>Login page</h1>
      <PrimaryButton content="Iniciar sesión"></PrimaryButton>
    </div>
  );
}

export default LoginPage;
