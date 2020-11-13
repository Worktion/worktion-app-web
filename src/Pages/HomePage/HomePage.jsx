import React from "react";
import { useUser } from "../../context/user-context";

const HomePage = () => {
  const { user } = useUser();

  return <h1>Bienvendio tu HomePage {user.id} </h1>;
};

export default HomePage;
