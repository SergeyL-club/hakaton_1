import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

const app = (
  <Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
