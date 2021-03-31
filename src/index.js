import "./main.css";

import App from "./containers/app";
import React from "react";
import ReactDOM from "react-dom";

import { store } from './store';

store.fetchData();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
