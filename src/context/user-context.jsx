import {
  setToken,
  deleteToken,
  setRefreshToken,
  getToken,
  getRefreshToken,
  deleteRefreshToken,
  refreshAccessToken,
  tokenExpirated,
} from "../helpers/auth-helper";
import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import jwt from "jwt-decode";

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
        const { accessExp, user_id } = jwt(getToken());
        if (tokenExpirated(accessExp)) {
          const { refreshExp } = jwt(getRefreshToken());
          if (tokenExpirated(refreshExp)) {
            deleteToken();
            deleteRefreshToken();
          } else {
            await refreshAccessToken();
            setUser({ id: user_id });
          }
        } else {
          setUser({ id: user_id });
        }

        setLoadingUser(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadUser();
  }, []);

  async function login(username, password) {
    const { data } = await Axios.post("/api/token/", {
      email: username,
      password: password,
    });
    const { user_id } = jwt(data.access);
    setToken(data.access);
    setRefreshToken(data.refresh);
    setUser({ id: user_id, email: username });
  }

  async function signup(user) {
    try {
      const { data } = await Axios.post("/api/users/registration/", user);
      return;
    } catch (error) {
      throw error.response;
    }
  }

  function logout() {
    setUser(null);
    deleteToken();
    deleteRefreshToken();
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
