import { setToken, getToken, deleteToken } from "../helpers/auth-helper";
import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";

const UserContext = React.createContext();

export function UserProvider(props) {
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!getToken()) {
        setLoadingUser(false);
        return;
      }

      try {
        const { data: user } = await Axios.get("/auth/");
        setUser(user);
        setLoadingUser(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadUser();
  }, []);

  async function login(username, password) {
    const { data } = await Axios.post("/login/", {
      username: username,
      password: password,
    });
    setUser(data.user);
    setToken(data.token);
  }

  async function signup(user) {
    const { data } = await Axios.post("/user", user);
    setUser(data.user);
    setToken(data.token);
  }

  function logout() {
    setUser(null);yarn 
    deleteToken();
  }

  const value = useMemo(() => {
    return {
      user,
      loadingUser,
      signup,
      login,
      logout,
    };
  }, [user, loadingUser]);

  return <UserContext.Provider value={value} {...props} />;
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be in UserContext Provider");
  }

  return context;
}
