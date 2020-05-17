import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Classes from "./Menu.module.css";

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
    history.push("/");
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
            <NavLink
              exact
              to="/"
              className="nav-link"
              style={isActive(history, "/")}
            >
              Login
            </NavLink>
          </li>
        )}
        {isAuthenticated() && (
          <React.Fragment>
            <li>
              <NavLink
                exact
                to="/upload"
                className="nav-link"
                style={isActive(history, "/upload")}
              >
                Upload
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/myUploads"
                className="nav-link"
                style={isActive(history, "/myUploads")}
              >
                My Uploads
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
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
                onClick={() => {
                  signOut(history);
                }}
                style={isActive(history, "/logout")}
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
