import JWT from "jwt-decode";
import { connect } from "react-redux";
import React, { Component } from "react";
import Menu from "./Components/Menu/Menu";
import Users from "./Components/Users/Users";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Upload from "./Components/Upload/Upload";
import Profile from "./Components/Profile/Profile";
import UploadList from "./Components/UploadList/UploadList";
import SingleUpload from "./Components/SingleUpload/SingleUpload";
import GetSingleUser from "./Components/GetSingleUser/GetSingleUser";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import GetSingleUserUploads from "./Components/GetSingleUserUploads/GetSingleUserUploads";

const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  } else if (localStorage.getItem("jwt_token")) {
    return localStorage.getItem("jwt_token");
  } else {
    return false;
  }
};

class App extends Component {
  render() {
    let Element;
    if (!isAuthenticated()) {
      Element = (
        <>
          <Route path="/login" component={Login} />
          <Redirect to="/login" />
        </>
      );
    }
    if (
      isAuthenticated() &&
      JWT(localStorage.getItem("jwt_token")).role === "user"
    ) {
      Element = (
        <>
          <Route path="/upload" component={Upload} />
          <Route path="/myUploads" component={UploadList} />
          <Route path="/myUpload/:uploadId" component={SingleUpload} />
          <Route path="/myprofile" component={Profile} />
          <Redirect to="/upload" />
        </>
      );
    } else if (
      isAuthenticated() &&
      JWT(localStorage.getItem("jwt_token")).role === "admin"
    ) {
      Element = (
        <>
          <Route path="/signup" component={SignUp} />
          <Route path="/users" component={Users} />
          <Route path="/myprofile" component={Profile} />
          <Route exact path="/user/:userId" component={GetSingleUser} />
          <Route path="/myUpload/:uploadId" component={SingleUpload} />
          <Route
            path="/user/:userId/uploads"
            component={GetSingleUserUploads}
          />
          <Redirect to="/signup" />
        </>
      );
    }
    return (
      <BrowserRouter>
        <Menu />
        <Switch>{Element}</Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (State) => ({
  States: State,
});

export default connect(mapStateToProps, null)(App);
