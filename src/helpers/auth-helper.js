import Axios from "axios";
import jwt from "jwt-decode";

export function setToken(token) {
  localStorage.setItem(process.env.TOKEN_KEY, token);
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem(process.env.REFRESH_TOKEN_KEY, refreshToken);
}

export function getToken() {
  return localStorage.getItem(process.env.TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(process.env.REFRESH_TOKEN_KEY);
}

export function deleteToken() {
  localStorage.removeItem(process.env.TOKEN_KEY);
}

export function deleteRefreshToken() {
  localStorage.removeItem(process.env.REFRESH_TOKEN_KEY);
}

export async function refreshAccessToken() {
  const { data } = await Axios.post("/api/token/refresh/", {
    refresh: getRefreshToken(),
  });
  setToken(data.access);
}

export function setAxiosInterceptors() {
  Axios.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      deleteToken();
      const { exp } = jwt(getRefreshToken());
      if (Date.now() >= exp * 1000) {
        window.location = "/login";
      } else {
        await refreshAccessToken();
        return await Axios(error.config);
      }
    } else {
      return Promise.reject(error);
    }
  }
);
