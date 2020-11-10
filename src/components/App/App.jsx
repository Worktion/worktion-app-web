import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { setAxiosInterceptors } from "../../helpers/auth-helper";
import { UserProvider, useUser } from "../../context/user-context";
import LoginPage from "../../Pages/LoginPage/LoginPage";
import HomePage from "../../Pages/HomePage/HomePage"
import RegisterPage from "../../Pages/RegisterPage/RegisterPage"
setAxiosInterceptors();

function App() {
  const { loadUser, user } = useUser();
  return (
    <div>
      {user ? <LoginRoutes></LoginRoutes> : <LogoutRoutes></LogoutRoutes>}
    </div>
  );
}

const LoginRoutes = () => {
  return (
    <Switch>
      <Route exact path="/home">
        <HomePage></HomePage>
      </Route>
      <Route exact path="/newRoutine">
        <h1>Nueva rutina</h1>
      </Route>
      <Route exact path="/:username/routineDetail/:idRoutine">
        <h1>Detalle de la rutina de usuario</h1>
      </Route>
      <Route path="/">
        <Redirect to="/home" />
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
        <RegisterPage></RegisterPage>
      </Route>
      <Route exact path="/:username/routine/:idRoutine/public">
        <h1>Rutina compartida publicamente</h1>
      </Route>
      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};




export default () => (
  <UserProvider>
    <App></App>
  </UserProvider>
);
