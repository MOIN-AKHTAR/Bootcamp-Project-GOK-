import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// This Component Will Restict You To ProvateRoutes Only
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
const mapStateToProps = (State) => ({
  auth: State.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
