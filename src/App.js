import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Upload from "./Components/Upload/Upload";
import UploadList from "./Components/UploadList/UploadList";
import SingleUpload from "./Components/SingleUpload/SingleUpload";
import Menu from "./Components/Menu/Menu";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/upload" component={Upload} />
          <Route exact path="/myUploads" component={UploadList} />
          <Route path="/myUpload/:uploadId" component={SingleUpload} />
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
