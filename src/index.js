import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import JWT_DECODE from "jwt-decode";
import { Store } from "./Redux/Store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { setCurrentUser } from "./Redux/Actions/LogIn";

let JWT = localStorage.getItem("jwt_token");

// Keeping User LoggedIn Even We Hard Refresh
if (JWT) {
  // Decoding/Extracting Info From Token
  const { exp } = JWT_DECODE(JWT);
  setCurrentUser(JWT, Store.dispatch);
  //  If Token Get Expired Then
  const CurrentTime = Date.now() / 1000;

  if (exp < CurrentTime) {
    localStorage.clear();
    window.location.assign("/login");
  }
}

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// To Avoid Extra Hard Loading
if (module.hot) {
  module.hot.accept();
}
serviceWorker.unregister();
