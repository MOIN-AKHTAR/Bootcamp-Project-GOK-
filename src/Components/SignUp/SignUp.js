import React, { Component } from "react";
import Classes from "../Login/Login.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Validator from "validator";
// import BackDrop from "../../UI/BackDrop/BackDrop";

export default class Login extends Component {
  state = {
    formData: {
      name: {
        elementConfig: {
          type: "text",
          placeholder: "Enter Your Name",
          title: "Name",
          id: "name",
          name: "name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
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
      office: {
        elementConfig: {
          type: "text",
          placeholder: "Enter Your Office",
          title: "Office",
          id: "office",
          name: "office",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      phone_number: {
        elementConfig: {
          type: "text",
          placeholder: "Enter Your Phone Number",
          title: "Phone Number",
          id: "phone_number",
          name: "phone_number",
        },
        validation: {
          required: true,
          minlength: 9,
        },
        valid: false,
        touched: false,
        value: "",
      },
    },
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
    let formIsValid = true;
    for (const key in this.state.formData) {
      formIsValid = this.state.formData[key].valid && formIsValid;
    }
    this.setState({
      formData: CopyStateForm,
      fomValid: formIsValid,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-8 m-auto ">
            <h1 className="text-center mb-2 text-primary">SignUp</h1>
            <div className={Classes.form}>
              <form>
                <Input
                  {...this.state.formData.name.elementConfig}
                  value={this.state.formData.name.value}
                  onChange={this.onChangeHandler}
                  valid={this.state.formData.name.valid}
                  touched={this.state.formData.name.touched}
                />
                <Input
                  {...this.state.formData.email.elementConfig}
                  value={this.state.formData.email.value}
                  onChange={this.onChangeHandler}
                  valid={this.state.formData.email.valid}
                  touched={this.state.formData.email.touched}
                />
                <Input
                  {...this.state.formData.password.elementConfig}
                  value={this.state.formData.password.value}
                  onChange={this.onChangeHandler}
                  valid={this.state.formData.password.valid}
                  touched={this.state.formData.password.touched}
                />
                <Input
                  {...this.state.formData.office.elementConfig}
                  value={this.state.formData.office.value}
                  onChange={this.onChangeHandler}
                  valid={this.state.formData.office.valid}
                  touched={this.state.formData.office.touched}
                />
                <Input
                  {...this.state.formData.phone_number.elementConfig}
                  value={this.state.formData.phone_number.value}
                  onChange={this.onChangeHandler}
                  valid={this.state.formData.phone_number.valid}
                  touched={this.state.formData.phone_number.touched}
                />
                <Button title="SignUp" isValid={this.state.fomValid} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
