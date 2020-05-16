import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UploadItem extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    uploads: this.props.uploads,
  };

  showRecord = (id) => console.log(id);

  render() {
    return (
      <div className="text-center mt-3">
        <h1 className="text-primary my-2">My Uploads</h1>
        <table className="table  table-hover">
          <thead className="thead-dark ">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Month</th>
              <th scope="col">Year</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.uploads.map((upload, index) => (
              <tr key={upload._id}>
                <th scope="row">{index}</th>
                <td>{upload.amount}</td>
                <td>{upload.status}</td>
                <td>{upload.month}</td>
                <td>{upload.year}</td>
                <td>
                  <Link className="btn btn-danger" to="/">
                    Delete
                  </Link>
                  <Link className="btn btn-primary" to="/">
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
