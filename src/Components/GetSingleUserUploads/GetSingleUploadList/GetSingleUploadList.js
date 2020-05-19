import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class GetSingleUploadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: this.props.uploads,
      loading: false,
      error: null,
    };
  }
  render() {
    let Element;
    if (this.state.uploads.length === 0) {
      Element = (
        <h1 className="text-danger text-center my-5">No Upload Found :(</h1>
      );
    } else {
      Element = (
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

          <div className="text-center">
            <h1 className="text-primary">Uploads</h1>

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
        </React.Fragment>
      );
    }
    return <div>{Element}</div>;
  }
}
export default withRouter(GetSingleUploadList);
