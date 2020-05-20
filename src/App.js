import JWT from "jwt-decode";
import { connect } from "react-redux";
import React, { Component } from "react";
import Menu from "./Components/Menu/Menu";
import Users from "./Components/Users/Users";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Upload from "./Components/Upload/Upload";
import Private from "./Components/Private/Private";
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
    if (
      isAuthenticated() &&
      JWT(localStorage.getItem("jwt_token")).role === "user"
    ) {
      Element = (
        <>
          <Private path="/upload" component={Upload} />
          <Private exact path="/myUploads" component={UploadList} />
          <Private path="/myUpload/:uploadId" component={SingleUpload} />
          <Private path="/myprofile" component={Profile} />
          <Redirect to="/upload" />
        </>
      );
    } else if (
      isAuthenticated() &&
      JWT(localStorage.getItem("jwt_token")).role === "admin"
    ) {
      Element = (
        <>
          <Private path="/signup" component={SignUp} />
          <Private exact path="/user/:userId" component={GetSingleUser} />
          <Private
            path="/user/:userId/uploads"
            component={GetSingleUserUploads}
          />
          <Private path="/users" component={Users} />
          <Private path="/myUpload/:uploadId" component={SingleUpload} />
          <Private path="/myprofile" component={Profile} />
          <Redirect to="/signup" />
        </>
      );
    }
    return (
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route path="/login" exact component={Login} />
          {Element}
          <Redirect from="/" to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (State) => ({
  States: State,
});

export default connect(mapStateToProps, null)(App);
