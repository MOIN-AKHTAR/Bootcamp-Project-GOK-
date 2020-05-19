import React, { Component } from "react";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Spinner from "../../UI/Spinner/Spinner";
import { connect } from "react-redux";
import { Get_Specific_User_Uploads } from "../../Redux/Actions/Uploads";
import GetSingleUploadList from "./GetSingleUploadList/GetSingleUploadList";

class GetSingleUserUploads extends Component {
  state = {
    loading: true,
    error: "",
    uploads: null,
  };

  componentDidMount() {
    this.props.Get_Specific_User_Uploads(this.props.match.params.userId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error.message,
        loading: false,
      });
    } else if (nextProps.upload.uploads) {
      this.setState({
        uploads: nextProps.upload.uploads,
        loading: false,
      });
    }
  }

  render() {
    let Element;
    if (this.state.loading && this.state.uploads === null) {
      Element = (
        <div>
          <BackDrop />
          <Spinner asOverlay />
        </div>
      );
    } else {
      Element = <GetSingleUploadList uploads={this.state.uploads} />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            {this.state.error ? (
              <h1 className="text-danger my-5 text-center">
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
  upload: State.upload,
  error: State.error,
});

export default connect(mapStateToProps, { Get_Specific_User_Uploads })(
  GetSingleUserUploads
);
