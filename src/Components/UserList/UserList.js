import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Get_User_Via_Office,
  Get_User_Via_Year,
  Load_Users,
} from "../../Redux/Actions/User";
import { DatePicker } from "antd";
import { connect } from "react-redux";
import "antd/dist/antd.css";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Users: this.props.Users,
      year: new Date().getFullYear(),
      officeName: "",
      error: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error.message,
      });
    } else if (nextProps.user.users) {
      this.setState({
        Users: nextProps.user.users,
      });
    }
  }

  // To Change OfficeName
  onChange = (e) => {
    if (e.target.value.trim().length > 0) {
      this.props.Get_User_Via_Office(e.target.value.trim());
    }
    this.setState({
      officeName: e.target.value,
    });
  };

  // To Chnage Year
  changeYear = (Value) => {
    if (Value !== null) {
      this.setState({
        year: new Date(Value).getFullYear(),
      });
      this.props.Get_User_Via_Year(new Date(Value).getFullYear());
    } else {
      this.props.Load_Users();
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="my-2">
          <button
            className="btn btn-primary"
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            Back
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <input
            onChange={this.onChange}
            placeholder="Search By Office"
            value={this.state.officeName}
            style={{
              width: "40%",
              marginRight: "1rem",
              outline: "none",
              border: "1px solid gray",
              height: "2.5rem",
              fontSize: "1.5rem",
            }}
          />
          <DatePicker
            picker="year"
            placeholder="Search User By Year"
            onChange={this.changeYear}
            style={{
              width: "40%",
              outline: "none",
              border: "1px solid gray",
              height: "2.5rem",
            }}
          />
        </div>
        {this.state.Users.length === 0 ? (
          <h1 className="text-center text-danger my-5">
            Couldn't Find Any User
          </h1>
        ) : (
          <React.Fragment>
            <h1 className="text-primary my-2 text-center">All Users</h1>
            <table className="table">
              <thead className="thead-dark ">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Month</th>
                  <th scope="col">Year</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.Users.map((user, index) => (
                  <tr key={user._id}>
                    <th scope="row">{index}</th>
                    <td>{user.name}</td>
                    <td>{user.month}</td>
                    <td>{user.year}</td>
                    <td>
                      <Link
                        className="btn btn-primary"
                        to={`/user/${user._id}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (State) => ({
  user: State.user,
  error: State.error,
});

export default connect(mapStateToProps, {
  Get_User_Via_Office,
  Get_User_Via_Year,
  Load_Users,
})(withRouter(UserList));
