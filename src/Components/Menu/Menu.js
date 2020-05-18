import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Classes from "./Menu.module.css";
const JWT_DECODE = require("jwt-decode");

const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  } else if (localStorage.getItem("jwt_token")) {
    return localStorage.getItem("jwt_token");
  } else {
    return false;
  }
};

// To SignOut
const signOut = (history) => {
  if (typeof window !== "undefined") {
    // Remove JWT From LocalStorage
    localStorage.removeItem("jwt_token");
    window.location.href = "/";
  }
};

const isActive = (history, path) =>
  history.location.pathname === path
    ? { color: "#ff9900" }
    : { color: "#ffffff" };

function MenuBar({ history }) {
  return (
    <div className={`nav nav-tabs bg-primary  ${Classes.wrapper}`}>
      <ul className={`${Classes.ul}`}>
        {!isAuthenticated() && (
          <li className="nav-item">
            <NavLink to="/" className="nav-link" style={isActive(history, "/")}>
              Login
            </NavLink>
          </li>
        )}
        {isAuthenticated() &&
          JWT_DECODE(localStorage.getItem("jwt_token")).role === "admin" && (
            <React.Fragment>
              <li>
                <NavLink
                  to="/signup"
                  style={isActive(history, "/signup")}
                  className="nav-link"
                >
                  Signup
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users"
                  style={isActive(history, "/users")}
                  className="nav-link"
                >
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/myprofile"
                  style={isActive(history, "/myprofile")}
                  className="nav-link"
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/logout"
                  style={isActive(history, "/logout")}
                  onClick={() => {
                    signOut(history);
                  }}
                  className="nav-link"
                >
                  Logout
                </NavLink>
              </li>
            </React.Fragment>
          )}
        {isAuthenticated() &&
          JWT_DECODE(localStorage.getItem("jwt_token")).role === "user" && (
            <React.Fragment>
              <li>
                <NavLink
                  to="/upload"
                  className="nav-link"
                  style={isActive(history, "/upload")}
                >
                  Upload
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/myUploads"
                  className="nav-link"
                  style={isActive(history, "/myUploads")}
                >
                  My Uploads
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/myprofile"
                  className="nav-link"
                  style={isActive(history, "/myprofile")}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/logout"
                  style={isActive(history, "/logout")}
                  onClick={() => {
                    signOut(history);
                  }}
                  className="nav-link"
                >
                  Logout
                </NavLink>
              </li>
            </React.Fragment>
          )}
      </ul>
    </div>
  );
}

export default withRouter(MenuBar);
