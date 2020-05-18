import React, { Component } from "react";
import { connect } from "react-redux";
import { GetProfile, UpdateProfile } from "../../Redux/Actions/Profile";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Spinner from "../../UI/Spinner/Spinner";
import UploadImage from "../../UI/UploadImage/UploadImage";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

let Image;
class Profile extends Component {
  state = {
    loading: true,
    error: false,
    profile: null,
    password: null,
    isValid: true,
  };
  //   Fetching Data From DB
  componentDidMount() {
    this.props.GetProfile();
  }
  //   Setting Password
  onChangeHandler = (e) => {
    let valid = true;
    this.setState({
      [e.target.name]: e.target.value,
      isValid: valid && e.target.value.trim().length >= 6,
    });
  };
  //   Setting Image
  setImg = (img) => {
    Image = img;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        loading: false,
        error: nextProps.error.message,
      });
    }
    if (nextProps.profile.profile) {
      Image = nextProps.profile.profile.pic;
      this.setState({
        password: nextProps.profile.profile.password,
        loading: false,
        profile: nextProps.profile.profile,
      });
    }
  }

  // Updating Data
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      const formData = new FormData();
      formData.append("pic", Image);
      formData.append("password", this.state.password);
      this.props.UpdateProfile(formData);
    }, 3000);
  };

  render() {
    let Element = null;
    if (this.state.loading && this.state.profile === null) {
      Element = (
        <React.Fragment>
          <Spinner asOverlay />
          <BackDrop />
        </React.Fragment>
      );
    } else if (!this.state.error && this.state.profile !== null) {
      Element = (
        <div className="mt-2">
          {this.state.loading && (
            <React.Fragment>
              <Spinner asOverlay />
              <BackDrop />
            </React.Fragment>
          )}
          <form onSubmit={this.onSubmit}>
            <UploadImage Image={this.state.profile.pic} onInput={this.setImg} />
            <Input
              name="password"
              id="password"
              title={"Password"}
              type="text"
              placeholder="Enter New Password"
              value={this.state.password}
              onChange={this.onChangeHandler}
              valid={true}
              touched={true}
            />
            <div className="text-center">
              <h4>Name: {this.state.profile.name}</h4>
              <h4>Email: {this.state.profile.email}</h4>
              <h4>Office: {this.state.profile.office}</h4>
              <Button isValid={this.state.isValid} title="Update" />
            </div>
          </form>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            {this.state.error ? (
              <h1 className="my-3 text-center text-danger">
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
  profile: State.profile,
  error: State.error,
});

export default connect(mapStateToProps, { GetProfile, UpdateProfile })(Profile);