import React from "react";
import JWT_DECODE from "jwt-decode";
import Classes from "./Menu.module.css";
import { Store } from "../../Redux/Store";
import { NavLink, withRouter } from "react-router-dom";
import { CLEAR_CURRENT_USER } from "../../Redux/Types/Types";

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
    localStorage.removeItem("jwt_token");
    Store.dispatch({
      type: CLEAR_CURRENT_USER,
    });
    history.push("/login");
  }
};

const isActive = (history, path) =>
  history.location.pathname === path
    ? { color: "#ff9900" }
    : { color: "#ffffff" };

function MenuBar({ history }) {
  return (
    <div className={`nav nav-tabs bg-dark ${Classes.wrapper}`}>
      <ul className={`${Classes.ul}`}>
        {isAuthenticated() &&
          JWT_DECODE(localStorage.getItem("jwt_token")).role === "admin" && (
            <React.Fragment>
              <li>
                <NavLink
                  to="/signup"
                  style={isActive(history, "/signup")}
                  className="nav-link"
                >
                  Add User
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
                  to="/login"
                  onClick={() => {
                    signOut(history, "/login");
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
                  to="/login"
                  style={isActive(history, "/login")}
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
