import moment from "moment";
import "antd/dist/antd.css";
import { DatePicker } from "antd";
import { connect } from "react-redux";
import React, { Component } from "react";
import Model from "../../UI/Model/Model";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import Classes from "../Login/Login.module.css";
import BackDrop from "../../UI/BackDrop/BackDrop";
import FileInput from "../../UI/FileInput/FileInput";
import { Upload_Post } from "../../Redux/Actions/Uploads";
import DropDown from "../../UI/DropDown/DropDown";

let prevId = 1,
  image = null;
class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      amount: "",
      pic: "",
      error: "",
      option: [
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
      loading: false,
      showModel: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.upload.upload && nextProps.upload.upload._id !== prevId) {
      prevId = nextProps.upload.upload._id;
      this.setState({
        month: 0,
        pic: "",
        amount: "",
        loading: false,
        showModel: true,
      });
    }
    if (nextProps.error) {
      // If Any Error Show Errors On Login Form
      this.setState({
        loading: false,
        showModel: false,
        error: nextProps.error,
      });
    }
  }

  // Change Year
  onChangeYear = (date) => {
    if (date) {
      this.setState({
        year: new Date(date._d).getFullYear(),
      });
    }
  };

  // Change Inputs
  onChangeHandler = (e) => {
    let value = e.target.name === "pic" ? e.target.files[0] : e.target.value;
    image = e.target.name === "pic" && e.target.files[0];
    this.setState({
      [e.target.name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });

    const formData = new FormData();
    formData.append("month", this.state.month);
    formData.append("amount", this.state.amount);
    formData.append("year", this.state.year);
    formData.append("pic", image);

    this.props.Upload_Post(formData);
  };

  changeShow = (e) => {
    // showModel = false;
    this.setState({
      showModel: false,
    });
    this.props.history.push("/myUploads");
  };

  render() {
    const { pic: picErr, amount: amountErr, message } = this.state.error;
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-10 m-auto ">
            <React.Fragment>
              {this.state.showModel && (
                <Model show={this.state.showModel}>
                  <h3>Uploaded Successfully!!!</h3>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.changeShow}
                  >
                    OK
                  </button>
                </Model>
              )}
            </React.Fragment>
            <div>
              {this.state.loading && (
                <div>
                  <Spinner asOverlay />
                  <BackDrop />
                </div>
              )}
            </div>

            <div>
              {message && (
                <h1 className="text-center text-danger">{message}</h1>
              )}
              <h1 className="mt-2 text-primary text-center">Create Uploads</h1>
              <div className={Classes.form}>
                <form onSubmit={this.onSubmit}>
                  <DropDown
                    title="Month"
                    id="month"
                    name="month"
                    Arr={this.state.option}
                    onChange={this.onChangeHandler}
                    value={this.state.month}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "corowlumn",
                      margin: "16px auto",
                      width: "80%",
                    }}
                  >
                    <label
                      style={{
                        fontWeight: "bolder",
                        fontSize: "1rem",
                        fontStyle: "oblique",
                        width: "20%",
                        marginRight: "10px",
                      }}
                      htmlFor="year"
                    >
                      Year
                    </label>
                    <DatePicker
                      style={{
                        width: "100%",
                      }}
                      picker="year"
                      id="year"
                      defaultValue={moment(this.state.year, "YYYY")}
                      onChange={this.onChangeYear}
                      placeholder="Select Year"
                    />
                  </div>

                  <Input
                    type="number"
                    placeholder="Enter Your Amount"
                    title="Amount"
                    id="amount"
                    name="amount"
                    value={this.state.amount}
                    onChange={this.onChangeHandler}
                    error={amountErr}
                  />
                  <FileInput
                    type="file"
                    placeholder="Select A File"
                    title="Picture"
                    id="pic"
                    name="pic"
                    onChange={this.onChangeHandler}
                    error={picErr}
                    valu={this.state.pic}
                  />
                  <Button isValid={true} title="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (State) => ({
  error: State.error,
  upload: State.upload,
});

export default connect(mapStateToProps, { Upload_Post })(Upload);
