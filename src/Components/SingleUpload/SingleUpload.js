import React, { Component } from "react";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Spinner from "../../UI/Spinner/Spinner";
import { Get_Upload, UpdateUpload } from "../../Redux/Actions/Uploads";
import { connect } from "react-redux";
import UploadImage from "../../UI/UploadImage/UploadImage";
import Button from "../../UI/Button/Button";

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

  // Getting Data From Stroe After Dispatch
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.error);
    if (nextProps.error) {
      this.setState({
        error: nextProps.error.message,
        loading: false,
      });
    }
    if (!nextProps.upload.loading) {
      Image = nextProps.upload.upload.pic[0];
      this.setState({
        loading: false,
        upload: nextProps.upload.upload,
      });
    }
  }

  render() {
    let Element;
    // const { upload } = this.props.upload;
    if (this.state.upload === null) {
      Element = (
        <div>
          <Spinner asOverlay />
          <BackDrop />
        </div>
      );
    } else if (
      // !this.state.loading &&
      this.state.upload !== null ||
      !this.state.error
    ) {
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
              <UploadImage
                Image={this.state.upload.pic[0]}
                onInput={this.onInput}
              />
              <div className="mt-3">
                <h3>ID:{this.state.upload._id}</h3>
                <h3>
                  Created At :
                  {new Date(this.state.upload.createdAt).toDateString()}
                </h3>
                <h3>Month:{MONTH[this.state.upload.month]}</h3>
                <h3>Year: {this.state.upload.year}</h3>
                <h3>Status: {this.state.upload.status}</h3>
                <h3>Amount: {this.state.upload.amount}</h3>
                <Button isValid={true} title="Update" />
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

export default connect(mapStateToProps, { Get_Upload, UpdateUpload })(
  SingleUpload
);
