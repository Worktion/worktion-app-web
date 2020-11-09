import React from "react";
import {useUser} from "../../context/user-context"

const HomePage = () =>  {
  const {user} = useUser();
  return (
    <div>
      <h1>Bienvendio tu HomePage {user.name} </h1>
    </div>
  );
}

export default HomePage;
