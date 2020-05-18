import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Upload from "./Components/Upload/Upload";
import UploadList from "./Components/UploadList/UploadList";
import SingleUpload from "./Components/SingleUpload/SingleUpload";
import Menu from "./Components/Menu/Menu";
import Profile from "./Components/Profile/Profile";
import Users from "./Components/Users/Users";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
const JWT = require("jwt-decode");

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
    // if (!isAuthenticated()) {
    //   Element = (
    //     <Switch>
    //       <Route path="/" exact component={Login} />
    //       <Redirect to="/" />
    //     </Switch>
    //   );
    // }
    if (
      isAuthenticated() &&
      JWT(localStorage.getItem("jwt_token")).role === "user"
    ) {
      Element = (
        <Switch>
          <Route path="/upload" component={Upload} />
          <Route exact path="/myUploads" component={UploadList} />
          <Route path="/myUpload/:uploadId" component={SingleUpload} />
          <Route path="/myprofile" component={Profile} />
          <Redirect to="/upload" />
        </Switch>
      );
    } else if (
      isAuthenticated() &&
      JWT(localStorage.getItem("jwt_token")).role === "admin"
    ) {
      Element = (
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/users" component={Users} />
          <Route path="/myprofile" component={Profile} />
          <Redirect to="/signup" />
        </Switch>
      );
    }
    return (
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route path="/" exact component={Login} />
          {Element}
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (State) => ({
  States: State,
});

export default connect(mapStateToProps, null)(App);
