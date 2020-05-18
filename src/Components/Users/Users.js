import React, { Component } from "react";
import { connect } from "react-redux";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Spinner from "../../UI/Spinner/Spinner";
import UserList from "../UserList/UserList";
import { Load_Users } from "../../Redux/Actions/User";

class Users extends Component {
  state = {
    loading: true,
    error: "",
    users: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error.message,
        loading: false,
      });
    } else if (nextProps.user.users) {
      this.setState({
        users: nextProps.user.users,
        loading: false,
      });
    }
  }

  componentDidMount() {
    this.props.Load_Users();
  }

  render() {
    let Element;
    if (this.state.loading && this.state.users === null) {
      Element = (
        <div>
          <Spinner asOverlay />
          <BackDrop />
        </div>
      );
    } else {
      Element = <UserList Users={this.state.users} />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            {this.state.error ? (
              <h1 className="text-center text-danger mt-3">
                {this.state.error}
              </h1>
            ) : (
              <div>{Element}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (State) => ({
  user: State.user,
  error: State.error,
});

export default connect(mapStateToProps, { Load_Users })(Users);
