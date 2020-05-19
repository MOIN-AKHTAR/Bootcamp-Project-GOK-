import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Users: this.props.Users,
    };
  }
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

export default withRouter(UserList);
