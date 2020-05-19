import React, { Component } from "react";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Spinner from "../../UI/Spinner/Spinner";
import {
  Get_Upload,
  UpdateUpload,
  Reject_Upload,
  Approve_Upload,
  Pedn_Upload,
} from "../../Redux/Actions/Uploads";
import { connect } from "react-redux";
import UploadImage from "../../UI/UploadImage/UploadImage";
import Button from "../../UI/Button/Button";
import JWT from "jwt-decode";

let Image = null;
let MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class SingleUpload extends Component {
  state = {
    loading: true,
    error: "",
    upload: null,
  };

  // To Update Image Of Upload
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const formData = new FormData();
    formData.append("pic", Image);
    this.props.UpdateUpload(
      this.state.upload._id,
      formData
      // this.props.history
    );
  };

  // Setting New Image For Upload
  onInput = (img) => {
    Image = img;
  };

  // Getting Upload With ID
  componentDidMount() {
    this.props.Get_Upload(this.props.match.params.uploadId);
  }
  // Approve Upload
  Approved = (Id) => this.props.Approve_Upload(Id);
  // Decline Upload
  Declined = (Id) => this.props.Reject_Upload(Id);
  // Pend Upload
  Pend = (Id) => this.props.Pedn_Upload(Id);

  // Getting Data From Stroe After Dispatch
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error.message,
        loading: false,
      });
    }
    if (!nextProps.upload.loading && nextProps.upload.upload) {
      Image = nextProps.upload.upload.pic[0];
      this.setState({
        loading: false,
        upload: nextProps.upload.upload,
      });
    }
  }

  render() {
    let Element;
    if (this.state.upload === null) {
      Element = (
        <div>
          <Spinner asOverlay />
          <BackDrop />
        </div>
      );
    } else if (!this.state.loading && this.state.upload !== null) {
      Element = (
        <div>
          {this.state.loading && (
            <>
              <BackDrop />
              <Spinner asOverlay />
            </>
          )}
          <div className="col-md-6 m-auto">
            <form onSubmit={this.onSubmit}>
              {localStorage.getItem("jwt_token") &&
              JWT(localStorage.getItem("jwt_token")).role !== "admin" ? (
                <UploadImage
                  Image={this.state.upload.pic[0]}
                  onInput={this.onInput}
                />
              ) : (
                <div
                  style={{ width: "10rem", height: "10rem", margin: "auto" }}
                >
                  <img
                    src={this.state.upload.pic[0]}
                    alt="No Image"
                    style={{ width: "100%", height: "100%" }}
                    aria-hidden={true}
                  />
                </div>
              )}

              <div className="mt-3">
                <h3>ID:{this.state.upload._id}</h3>
                <h3>Month:{MONTH[this.state.upload.month]}</h3>
                <h3>Year: {this.state.upload.year}</h3>
                <h3>Status: {this.state.upload.status}</h3>
                <h3>Amount: {this.state.upload.amount}</h3>
                <div>
                  {localStorage.getItem("jwt_token") &&
                  JWT(localStorage.getItem("jwt_token")).role !== "admin" ? (
                    <Button isValid={true} title="Update" />
                  ) : (
                    <div className="text-center">
                      {this.state.upload.status !== "declined" && (
                        <button
                          onClick={() => this.Declined(this.state.upload._id)}
                          type="button"
                          className="btn btn-danger"
                          style={{ border: "1px solid black", margin: "5px" }}
                        >
                          Declined
                        </button>
                      )}
                      {this.state.upload.status !== "approved" && (
                        <button
                          onClick={() => this.Approved(this.state.upload._id)}
                          type="button"
                          className="btn btn-success"
                          style={{ border: "1px solid black", margin: "5px" }}
                        >
                          Approve
                        </button>
                      )}
                      {this.state.upload.status !== "pending" && (
                        <button
                          onClick={() => this.Pend(this.state.upload._id)}
                          type="button"
                          className="btn btn-secondary"
                          style={{ border: "1px solid black", margin: "5px" }}
                        >
                          Pending
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            {this.state.error ? (
              <h1 className="text-danger text-center my-3">
                {this.state.error}
              </h1>
            ) : (
              <div>
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
                {Element}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (State) => ({
  upload: State.upload,
  error: State.error,
});

export default connect(mapStateToProps, {
  Get_Upload,
  UpdateUpload,
  Reject_Upload,
  Approve_Upload,
  Pedn_Upload,
})(SingleUpload);
