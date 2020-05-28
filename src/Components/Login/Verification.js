import React, { Component } from "react";
import BackDrop from "../../UI/BackDrop/BackDrop";
import { connect } from "react-redux";
import { Verify_Account } from "../../Redux/Actions/User";

class Verification extends Component {
  state = {
    error: null,
  };
  componentDidMount() {
    this.props.Verify_Account(this.props.match.params.id);
    console.log(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.error.message) {
      this.setState({
        error: nextProps.error.message,
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.error ? (
          <h1 style={{ color: "red", textAlign: "center" }}>
            {this.state.error}
          </h1>
        ) : (
          <div
            style={{
              position: "fixed",
              zIndex: "150",
              height: "50vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BackDrop />
            <h3 style={{ color: "#34566f" }}>
              Please Wait Verfying Your Account...
            </h3>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (State) => ({
  error: State.error,
});
export default connect(mapStateToProps, { Verify_Account })(Verification);
