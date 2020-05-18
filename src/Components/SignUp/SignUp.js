import React, { Component } from "react";
import Classes from "../Login/Login.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { Create_User } from "../../Redux/Actions/User";
import { connect } from "react-redux";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Spinner from "../../UI/Spinner/Spinner";
let prevId = 1;
class SignUp extends Component {
  state = {
    name: "",
    email: "",
    office: "",
    phone_number: "",
    year: new Date().getFullYear(),
    message: "",
    loading: false,
    error: "",
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.user.user && nextProps.user.user._id !== prevId) {
      prevId = nextProps.user.user._id;
      this.setState({
        name: "",
        email: "",
        office: "",
        phone_number: "",
        year: new Date().getFullYear(),
        message: "",
        loading: false,
        error: "",
      });
    }
    if (nextProps.error) {
      if (nextProps.error.message) {
        this.setState({
          message: nextProps.error.message,
          loading: false,
        });
      } else if (nextProps.error) {
        this.setState({
          error: nextProps.error,
          loading: false,
        });
      }
    }
  }

  // It Will Check Validation For Inputs
  // validationChecking = (value, rules) => {
  //   let isValid = true;
  //   if (rules.required) {
  //     isValid = value.trim() !== "" && isValid;
  //   }
  //   if (rules.isEmail) {
  //     isValid = Validator.isEmail(value) && isValid;
  //   }
  //   if (rules.minlength) {
  //     isValid = value.trim().length >= rules.minlength && isValid;
  //   }
  //   return isValid;
  // };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const data = {
      name: this.state.name,
      email: this.state.email,
      phone_number: this.state.phone_number,
      office: this.state.office,
    };
    this.props.Create_User(data);
  };

  // Change Inputs
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const {
      phone_number: phone_Err,
      email: email_Err,
      office: office_Err,
      name: name_Err,
    } = this.state.error;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-8 m-auto ">
            {this.state.loading && (
              <div>
                <Spinner asOverlay />
                <BackDrop />
              </div>
            )}
            <h1 className="text-center mb-2 text-primary">SignUp</h1>
            <div className={Classes.form}>
              <form onSubmit={this.onSubmit}>
                <Input
                  placeholder="Enter Name"
                  name="name"
                  id="name"
                  title="Name"
                  value={this.state.name}
                  onChange={this.onChangeHandler}
                  error={name_Err}
                />

                <Input
                  placeholder="Enter Email"
                  name="email"
                  id="email"
                  title="Email"
                  value={this.state.email}
                  onChange={this.onChangeHandler}
                  error={email_Err}
                />

                <Input
                  placeholder="Enter Office"
                  name="office"
                  id="office"
                  title="Office"
                  value={this.state.office}
                  onChange={this.onChangeHandler}
                  error={office_Err}
                />
                <Input
                  placeholder="Enter Number"
                  name="phone_number"
                  id="phone_number"
                  title="Number"
                  value={this.state.phone_number}
                  onChange={this.onChangeHandler}
                  error={phone_Err}
                />

                <Button title="SignUp" isValid={true} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (State) => ({
  user: State.user,
  error: State.error,
});

export default connect(mapStateToProps, { Create_User })(SignUp);
