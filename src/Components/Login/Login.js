import React, { Component } from "react";
import Classes from "./Login.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Validator from "validator";
import { connect } from "react-redux";
import { loginUser } from "../../Redux/Actions/LogIn";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Spinner from "../../UI/Spinner/Spinner";

class Login extends Component {
  state = {
    loading: false,
    formData: {
      email: {
        elementConfig: {
          type: "email",
          placeholder: "Enter Your Email",
          title: "Email",
          id: "email",
          name: "email",
        },
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      password: {
        elementConfig: {
          type: "password",
          placeholder: "Enter Your Password",
          title: "Password",
          id: "password",
          name: "password",
        },
        validation: {
          required: true,
          minlength: 6,
        },
        valid: false,
        touched: false,
        value: "",
      },
    },
    error: "",
    fomValid: false,
  };

  // It Will Check Validation For Inputs
  validationChecking = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.isEmail) {
      isValid = Validator.isEmail(value) && isValid;
    }
    if (rules.minlength) {
      isValid = value.trim().length >= rules.minlength && isValid;
    }
    return isValid;
  };

  // Change Inputs
  onChangeHandler = (e) => {
    const CopyStateForm = { ...this.state.formData };
    const CopyStateElement = { ...CopyStateForm[e.target.name] };
    CopyStateElement.value = e.target.value;
    CopyStateElement.valid = this.validationChecking(
      CopyStateElement.value,
      CopyStateElement.validation
    );
    CopyStateElement.touched = true;
    CopyStateForm[e.target.name] = CopyStateElement;
    // Checking Overall Form Validation
    let formIsValid = true;
    for (const key in this.state.formData) {
      formIsValid = this.state.formData[key].valid && formIsValid;
    }
    this.setState({
      formData: CopyStateForm,
      fomValid: formIsValid,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.auth.isAuthenticated) {
      // If User Is Authenticated Move To Upload Page
      this.props.history.push("/upload");
    }
    if (nextProps.error) {
      // If Any Error Show Errors On Login Form
      this.setState({
        error: nextProps.error,
        loading: false,
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const Data = {
      email: this.state.formData.email.value,
      password: this.state.formData.password.value,
    };
    this.props.loginUser(Data);
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8 m-auto ">
            {this.state.loading && (
              <div>
                <Spinner asOverlay />
                <BackDrop />
              </div>
            )}

            <h1 className="text-center mb-3 text-primary">Login</h1>
            <div className={Classes.form}>
              <form onSubmit={this.onSubmit}>
                <Input
                  {...this.state.formData.email.elementConfig}
                  value={this.state.formData.email.value}
                  onChange={this.onChangeHandler}
                  valid={this.state.formData.email.valid}
                  touched={this.state.formData.email.touched}
                  error={this.state.error}
                />
                <Input
                  {...this.state.formData.password.elementConfig}
                  value={this.state.formData.password.value}
                  onChange={this.onChangeHandler}
                  valid={this.state.formData.password.valid}
                  touched={this.state.formData.password.touched}
                  error={this.state.error}
                />
                <Button title="Login" isValid={this.state.fomValid} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (State) => ({
  auth: State.auth,
  error: State.error,
});

export default connect(mapStateToProps, { loginUser })(Login);
