import "antd/dist/antd.css";
import { DatePicker } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Classes from "./UploadItems.module.css";
import DropDown from "../../UI/DropDown/DropDown";
import { Get_Uploads } from "../../Redux/Actions/Uploads";
import { MONTH } from "../../Utils/Month";

class UploadItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: this.props.uploads,
      month: "all",
      year: new Date().getFullYear(),
      option: [
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
  }

  onChangeHandler = (e) => {
    this.props.loadByMonth(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeYear = (date) => {
    if (date) {
      this.props.loadByYear(new Date(date._d).getFullYear());
      this.setState({
        year: new Date(date._d).getFullYear(),
      });
    } else {
      this.props.Get_Uploads();
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.uploads !== this.props.uploads) {
      this.setState({
        uploads: nextProps.uploads,
      });
    }
  }

  render() {
    let Element;
    if (this.state.uploads.length === 0) {
      Element = (
        <div>
          <h1 className="text-danger text-center my-2">Uploads Not Found :(</h1>
        </div>
      );
    } else {
      Element = (
        <div className="text-center ">
          <h1 className="text-primary">Uploads</h1>
          <table className="table">
            <thead className="thead-dark ">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Month</th>
                <th scope="col">Year</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.uploads.map((upload, index) => (
                <tr key={upload._id}>
                  <th scope="row">{index}</th>
                  <td>{upload.amount}</td>
                  <td>{upload.status}</td>
                  <td>{MONTH[upload.month]}</td>
                  <td>{upload.year}</td>
                  <td>
                    <Link
                      className="btn btn-primary"
                      to={`/myUpload/${upload._id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <React.Fragment>
        <button
          className="btn btn-primary my-2"
          onClick={() => {
            this.props.history.push("/upload");
          }}
        >
          Back
        </button>
        <div className="mb-2">
          <>
            <DropDown
              title="Search By Month"
              id="month"
              name="month"
              Arr={this.state.option}
              onChange={this.onChangeHandler}
              value={this.state.month}
            />
          </>
          <div className={Classes.pickerWrapper}>
            <label htmlFor="year" className={`${Classes.label} `}>
              Search By Year
            </label>
            <DatePicker
              className={Classes.picker}
              picker="year"
              id="year"
              onChange={this.onChangeYear}
            />
          </div>
        </div>

        {Element}
      </React.Fragment>
    );
  }
}

export default connect(null, { Get_Uploads })(withRouter(UploadItem));
