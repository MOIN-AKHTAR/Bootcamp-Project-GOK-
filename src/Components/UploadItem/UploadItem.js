import React, { Component } from "react";
import DropDown from "../../UI/DropDown/DropDown";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { DatePicker } from "antd";
import "antd/dist/antd.css";

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
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.uploads !== this.props.uploads) {
      this.setState({
        uploads: nextProps.uploads,
      });
    }
  }

  showRecord = (id) => console.log(id);

  render() {
    let Element;
    if (this.state.uploads.length === 0) {
      Element = (
        <div>
          <h1 className="text-danger text-center my-2">Uploads Not Found...</h1>
        </div>
      );
    } else {
      Element = (
        <div className="text-center mt-1">
          <h1 className="text-primary my-2">Uploads</h1>

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
                  <td>{upload.month}</td>
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
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <button
              className="btn btn-primary my-2"
              onClick={() => {
                this.props.history.push("/upload");
              }}
            >
              Back
            </button>
            <div className="mb-2 m-auto d-flex align-items-center ">
              <DropDown
                title="Search By Month"
                id="month"
                name="month"
                Arr={this.state.option}
                onChange={this.onChangeHandler}
                value={this.state.month}
              />
              <div className="d-flex">
                <label htmlFor="year">Search By Year</label>
                <DatePicker
                  picker="year"
                  id="year"
                  onChange={this.onChangeYear}
                />
              </div>
            </div>

            {Element}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UploadItem);
