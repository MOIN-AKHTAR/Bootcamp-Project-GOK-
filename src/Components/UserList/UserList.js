import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Users: this.props.Users,
    };
  }
  render() {
    if (this.state.Users.length === 0) {
      return (
        <div>
          <h1 className="text-center text-danger-my-5">
            Couldn't Find Any User
          </h1>
        </div>
      );
    }
    return (
      <div className="text-center mt-3">
        <h1 className="text-primary my-2">All Users</h1>
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
                  <Link className="btn btn-primary" to={`/user/${user._id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
