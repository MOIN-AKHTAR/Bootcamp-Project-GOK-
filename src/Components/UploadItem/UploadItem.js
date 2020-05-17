import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class UploadItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: this.props.uploads,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.uploads !== this.props.uploads) {
      this.setState({
        uploads: nextProps.uploads,
      });
    }
  }

  showRecord = (id) => console.log(id);

  render() {
    let Element;
    if (this.state.uploads.length === 0) {
      Element = (
        <div>
          <h1 className="text-danger text-center my-2">
            You Don't Have Any Upload
          </h1>
        </div>
      );
    } else {
      Element = (
        <div className="text-center mt-1">
          <h1 className="text-primary my-2">My Uploads</h1>
          <table className="table">
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
                    <Link
                      className="btn btn-primary"
                      to={`/myUpload/${upload._id}`}
                    >
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
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <button
              className="btn btn-primary my-2"
              onClick={() => {
                this.props.history.push("/upload");
              }}
            >
              Back
            </button>
            {Element}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UploadItem);
