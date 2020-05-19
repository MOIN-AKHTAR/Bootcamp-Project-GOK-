import React, { Component } from "react";
import Classes from "../Login/Login.module.css";
import Input from "../../UI/Input/Input";
import DropDown from "../../UI/DropDown/DropDown";
import Button from "../../UI/Button/Button";
import FileInput from "../../UI/FileInput/FileInput";
import { connect } from "react-redux";
import { Upload_Post } from "../../Redux/Actions/Uploads";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Spinner from "../../UI/Spinner/Spinner";
import Model from "../../UI/Model/Model";
let image;
let prevId = 1;
class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: 0,
      amount: "",
      pic: "",
      error: "",
      loading: false,
      showModel: false,
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
    formData.append("pic", this.state.pic);

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
