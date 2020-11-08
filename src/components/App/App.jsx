import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../../Pages/LoginPage/LoginPage";

function App() {
  return (
    <div>
      <LoginRoutes></LoginRoutes>
      <LogoutRoutes></LogoutRoutes>
    </div>
  );
}

const LoginRoutes = () => {
  return (
    <Switch>
      <Route exact path="/home">
        <h1>Rutinas del usuario - home</h1>
      </Route>
      <Route exact path="/newRoutine">
        <h1>Nueva rutina</h1>
      </Route>
      <Route exact path="/:username/routineDetail/:idRoutine">
        <h1>Detalle de la rutina de usuario</h1>
      </Route>
    </Switch>
  );
};

const LogoutRoutes = () => {
  return (
    <Switch>
      <Route exact path="/login">
        <LoginPage></LoginPage>
      </Route>
      <Route exact path="/register">
        <h1>Nueva rutina</h1>
      </Route>
      <Route exact path="/:username/routine/:idRoutine/public">
        <h1>Rutina compartida publicamente</h1>
      </Route>
    </Switch>
  );
};

export default App;
