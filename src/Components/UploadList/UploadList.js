import React, { Component } from "react";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Spinner from "../../UI/Spinner/Spinner";
import UploadItem from "../UploadItem/UploadItem";
import {
  Get_Uploads,
  GetUploadViaMonth,
  GetUploadViaYear,
} from "../../Redux/Actions/Uploads";
import { connect } from "react-redux";

class UploadList extends Component {
  state = {
    error: "",
    loading: true,
    uploads: null,
  };
  componentDidMount() {
    this.props.Get_Uploads();
  }

  uploadByMonth = (month) => {
    if (month === "all") {
      this.props.Get_Uploads();
    } else {
      this.props.GetUploadViaMonth(month);
    }
  };

  uploadByYear = (year) => {
    this.props.GetUploadViaYear(year);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.upload.uploads) {
      this.setState({
        loading: false,
        uploads: nextProps.upload.uploads,
      });
    }
    if (nextProps.error) {
      this.setState({
        error: nextProps.error,
        loading: false,
      });
    }
  }

  render() {
    let Element;
    // const { uploads } = this.props.upload;
    if (this.state.loading || this.state.uploads === null) {
      Element = (
        <div>
          <Spinner asOverlay />
          <BackDrop />
        </div>
      );
    } else {
      Element = (
        <UploadItem
          uploads={this.state.uploads}
          loadByMonth={this.uploadByMonth}
          loadByYear={this.uploadByYear}
        />
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            {this.state.error ? (
              <h1 className="text-center text-danger mt-3">
                {this.state.error.message}
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

export default connect(mapStateToProps, {
  Get_Uploads,
  GetUploadViaMonth,
  GetUploadViaYear,
})(UploadList);
