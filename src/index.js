import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App/App";
import Axios from "axios";

Axios.defaults.baseURL = process.env.BASE_API_URL;

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
