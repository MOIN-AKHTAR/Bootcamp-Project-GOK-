import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import BackDrop from "../../UI/BackDrop/BackDrop";
import { Get_Single_User, Update_User_Office } from "../../Redux/Actions/User";

class GetSingleUser extends Component {
  state = {
    loading: true,
    error: false,
    message: "",
    user: null,
    isValid: true,
    newOffice: "",
  };

  componentDidMount() {
    this.props.Get_Single_User(this.props.match.params.userId);
  }

  // Receiving Props
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error.message,
        loading: false,
      });
    } else if (nextProps.user.user) {
      this.setState({
        user: nextProps.user.user,
        newOffice: nextProps.user.user.office,
        loading: false,
      });
    }
  }

  // Set New Value For Office
  changeHandler = (e) => {
    this.setState({
      newOffice: e.target.value,
      isValid: e.target.value.trim().length > 0,
    });
  };

  // Update Office
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const data = {
      office: this.state.newOffice,
    };
    this.props.Update_User_Office(this.state.user._id, data);
  };

  onChange = (Value) => console.log(Value);
  render() {
    let Element;
    if (this.state.loading && this.state.user === null) {
      Element = (
        <div>
          <Spinner asOverlay />
          <BackDrop />
        </div>
      );
    } else {
      Element = (
        <React.Fragment>
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
          <div className="text-center mt-2">
            <form onSubmit={this.onSubmit}>
              <div style={{ width: "10rem", height: "10rem", margin: "auto" }}>
                <img
                  src={this.state.user.pic}
                  alt="No Image"
                  style={{ width: "100%", height: "100%" }}
                  aria-hidden={true}
                />
              </div>
              <Input
                name="office"
                id="office"
                title="Office"
                placeholder={"Enter New Office"}
                value={this.state.newOffice}
                onChange={this.changeHandler}
              />
              <h4>Name: {this.state.user.name}</h4>
              <h4>Email: {this.state.user.email}</h4>
              <h4>Joining Year: {this.state.user.year}</h4>

              <Button title="Update" isValid={this.state.isValid} />
              <Link
                to={`/user/${this.state.user._id}/uploads`}
                className="btn btn-primary"
                style={{ border: "1px solid black", margin: "5px 0" }}
              >{`${this.state.user.name.split(" ")[0]}'s Uploads`}</Link>
            </form>
          </div>
        </React.Fragment>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            {this.state.error ? (
              <h1 className="mt-5 text-center text-danger">
                {this.state.error}
              </h1>
            ) : (
              <div>
                {this.state.loading && (
                  <div>
                    <Spinner asOverlay />
                    <BackDrop />
                  </div>
                )}
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
  user: State.user,
  error: State.error,
});

export default connect(mapStateToProps, {
  Get_Single_User,
  Update_User_Office,
})(GetSingleUser);
