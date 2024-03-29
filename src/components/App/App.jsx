import React from "react";
import "./App.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import { setAxiosInterceptors } from "../../helpers/auth-helper";
import { UserProvider, useUser } from "../../context/user-context";
import LoginPage from "../../Pages/LoginPage/LoginPage";
import HomePage from "../../Pages/HomePage/HomePage";
import RegisterPage from "../../Pages/RegisterPage/RegisterPage";
import NewRoutinePage from "../../Pages/NewRoutinePage/NewRoutinePage";
import Dashboard from "../../container/Dashboard/Dashboard";
import DashboardLogout from "../../container/Dashboard/DashboardLogout";
import SpinnerLoading from "../SpinnerLoading/SpinnerLoading";
import EditProfilePage from "../../Pages/EditProfilePage/EditProfilePage";
import RoutineDetailPage from "../../Pages/RoutineDetailPage/RoutineDetailPage";
import RoutinePublicPage from "../../Pages/RoutinePublicPage/RoutinePublicPage";

setAxiosInterceptors();

function App() {
  const { loadingUser, user } = useUser();

  if (loadingUser) {
    return <SpinnerLoading></SpinnerLoading>;
  }

  return (
    <>{user ? <LoginRoutes></LoginRoutes> : <LogoutRoutes></LogoutRoutes>}</>
  );
}

const LoginRoutes = () => {
  return (
    <Switch>
      <Route exact path="/home">
        <Dashboard children={<HomePage />} myRoutineItem={true} />
      </Route>
      <Route exact path="/newRoutine">
        <Dashboard children={<NewRoutinePage />} newRoutineItem={true} />
      </Route>
      <Route exact path="/routineDetail/:idRoutine">
        <Dashboard children={<RoutineDetailPage />}></Dashboard>
      </Route>
      <Route exact path="/editProfile">
        <Dashboard children={<EditProfilePage></EditProfilePage>}></Dashboard>
      </Route>
      <Route exact path="/public/routine/:idRoutine">
        <Dashboard children={<RoutinePublicPage />}></Dashboard>
      </Route>
      <Route path="*">
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
      <Route exact path="/public/routine/:idRoutine">
        <DashboardLogout children={<RoutinePublicPage />} />
      </Route>
      <Route path="*">
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
