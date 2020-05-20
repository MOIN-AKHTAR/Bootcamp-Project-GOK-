import React, { Component } from "react";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Spinner from "../../UI/Spinner/Spinner";
import { connect } from "react-redux";
import {
  Get_Specific_User_Uploads,
  Get_Specific_User_Uploads_Via_Month,
  Get_Specific_User_Uploads_Via_Status,
} from "../../Redux/Actions/Uploads";
import DropDown from "../../UI/DropDown/DropDown";
import GetSingleUploadList from "./GetSingleUploadList/GetSingleUploadList";

class GetSingleUserUploads extends Component {
  state = {
    loading: true,
    error: "",
    uploads: null,
    status: "all",
    month: "all",
    statusOption: [
      { value: "all", title: "All" },
      { value: "pending", title: "Pending" },
      { value: "declined", title: "Declined" },
      { value: "approved", title: "Approved" },
    ],
    monthOption: [
      { value: "all", title: "All" },
      { value: 0, title: "January" },
      { value: 1, title: "February" },
      { value: 2, title: "March" },
      { value: 3, title: "April" },
      { value: 4, title: "May" },
      { value: 5, title: "June" },
      { value: 6, title: "July" },
      { value: 7, title: "August" },
      { value: 8, title: "September" },
      { value: 9, title: "October" },
      { value: 10, title: "November" },
      { value: 11, title: "December" },
    ],
  };

  // Get Specific User's Upload Via Month
  getSpecificUserUploadsViaMonth = (Month) => {
    this.setState({
      loading: true,
    });
    if (Month === "all") {
      this.props.Get_Specific_User_Uploads(this.props.match.params.userId);
    } else {
      this.props.Get_Specific_User_Uploads_Via_Month(
        this.props.match.params.userId,
        Month
      );
    }
  };

  // Get Specific User's Upload Via Status
  getSpecificUserUploadsViaStatus = (Status) => {
    this.setState({
      loading: true,
    });
    if (Status === "all") {
      this.props.Get_Specific_User_Uploads(this.props.match.params.userId);
    } else {
      this.props.Get_Specific_User_Uploads_Via_Status(
        this.props.match.params.userId,
        Status
      );
    }
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
    } else if (
      nextProps.upload &&
      nextProps.upload.uploads &&
      !nextProps.upload.loading
    ) {
      this.setState({
        uploads: nextProps.upload.uploads,
        loading: false,
      });
    }
  }

  // Change Value For Month And Status
  onChangeHandler = (e) => {
    // If Selected Input Is Status Then We Will Run This Code
    if (e.target.name === "status") {
      this.getSpecificUserUploadsViaStatus(e.target.value);
    }
    // If Selected Input Is Month Then We Will Run This Code
    if (e.target.name === "month") {
      this.getSpecificUserUploadsViaMonth(e.target.value);
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let Element;
    if (this.state.loading && this.state.uploads === null) {
      Element = (
        <div>
          <BackDrop />
          <Spinner asOverlay />
        </div>
      );
    } else if (this.state.uploads !== null && !this.state.loading) {
      Element = <GetSingleUploadList uploads={this.state.uploads} />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
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
            {this.state.error ? (
              <h1 className="text-danger my-5 text-center">
                {this.state.error}
              </h1>
            ) : (
              <React.Fragment>
                <React.Fragment>
                  <DropDown
                    title="Search By Status"
                    id="status"
                    name="status"
                    Arr={this.state.statusOption}
                    onChange={this.onChangeHandler}
                    value={this.state.status}
                  />
                  <DropDown
                    title="Search By Month"
                    id="month"
                    name="month"
                    Arr={this.state.monthOption}
                    onChange={this.onChangeHandler}
                    value={this.state.month}
                  />
                </React.Fragment>

                <div>{Element}</div>
              </React.Fragment>
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
  Get_Specific_User_Uploads,
  Get_Specific_User_Uploads_Via_Month,
  Get_Specific_User_Uploads_Via_Status,
})(GetSingleUserUploads);
