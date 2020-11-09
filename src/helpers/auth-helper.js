import Axios from "axios";

export function setToken(token) {
  localStorage.setItem(process.env.TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(process.env.TOKEN_KEY);
}

export function deleteToken() {
  localStorage.removeItem(process.env.TOKEN_KEY);
}

export function setAxiosInterceptors() {
  Axios.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `token ${token}`;
    }
    return config;
  });
}

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      deleteToken();
      window.location = "/login";
    } else {
      return Promise.reject(error);
    }

  }
);
