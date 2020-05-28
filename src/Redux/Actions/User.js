import Axios from "axios";
import {
  CREATE_USER,
  CLEAR_ERROR,
  GET_ERROR,
  GET_USERS,
  LOAD_USER,
  GET_SINGLE_USER,
  UPDATE_USER,
  VERIFY_USER,
} from "../Types/Types";

// SignUp New User By Admin
export const Create_User = (data) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: CLEAR_ERROR,
  });
  Axios.post("http://localhost:5000/api/v1/user/signup", data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      Dispatch({
        type: CREATE_USER,
        Payload: res.data.data,
      });
    })
    .catch((err) => {
      if (err.response.data.errors) {
        Dispatch({
          type: GET_ERROR,
          Payload: err.response.data.errors,
        });
      } else {
        Dispatch({
          type: GET_ERROR,
          Payload: {
            message: err.response.data.message,
          },
        });
      }
    });
};

// Load All User's By Admin
export const Load_Users = (_) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_USER,
  });
  Axios.get("http://localhost:5000/api/v1/user/", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      Dispatch({
        type: GET_USERS,
        Payload: res.data.data,
      });
    })
    .catch((err) => {
      Dispatch({
        type: GET_ERROR,
        Payload: {
          message: err.response.data.message,
        },
      });
    });
};

// Get Single User With _id
export const Get_Single_User = (Id) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_USER,
  });
  Axios.get(`http://localhost:5000/api/v1/user/${Id}`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) =>
      Dispatch({
        type: GET_SINGLE_USER,
        Payload: res.data.data,
      })
    )
    .catch((err) =>
      Dispatch({
        type: GET_ERROR,
        Payload: {
          message: err.response.data.message,
        },
      })
    );
};

// Update Specific User's Office By Admin
export const Update_User_Office = (userId, newOffice) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_USER,
  });
  Axios.put(`http://localhost:5000/api/v1/user/${userId}/office/`, newOffice, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) =>
      Dispatch({
        type: UPDATE_USER,
        Payload: res.data.data,
      })
    )
    .catch((err) =>
      Dispatch({
        type: GET_ERROR,
        Payload: {
          message: err.response.data.message,
        },
      })
    );
};

// Get All Users Based On Given Office Name
export const Get_User_Via_Office = (data) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_USER,
  });

  Axios.get(`http://localhost:5000/api/v1/user/office/${data}`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) =>
      Dispatch({
        type: GET_USERS,
        Payload: res.data.data,
      })
    )
    .catch((err) => {
      console.log(err.response.data);
      Dispatch({
        type: GET_ERROR,
        Payload: {
          message: err.response.data.message,
        },
      });
    });
};

// Get All User's Joined In Given Year
export const Get_User_Via_Year = (year) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_USER,
  });

  Axios.get(`http://localhost:5000/api/v1/user/year/${year}`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) =>
      Dispatch({
        type: GET_USERS,
        Payload: res.data.data,
      })
    )
    .catch((err) => {
      console.log(err.response.data);
      Dispatch({
        type: GET_ERROR,
        Payload: {
          message: err.response.data.message,
        },
      });
    });
};

// Get All User's Joined In Given Year
export const Verify_Account = (Id) => (Dispatch) => {
  Axios.patch(`http://localhost:5000/api/v1/user/verify/${Id}`, {})
    .then((res) => {
      alert("Verified Successfully!!!");
      window.location.assign("/login");
    })
    .catch((err) => {
      console.log(err.response.data.message);
      Dispatch({
        type: GET_ERROR,
        Payload: {
          message: err.response.data.message,
        },
      });
    });
};
