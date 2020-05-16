import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { Store } from "./Redux/Store";
import JWT_DECODE from "jwt-decode";
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
    window.location.href = "/login";
  }
}

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
