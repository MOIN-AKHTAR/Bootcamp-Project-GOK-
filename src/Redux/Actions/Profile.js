import { GET_ERROR, GET_PROFILE, LOAD_PROFILE } from "../Types/Types";
import Axios from "axios";

export const GetProfile = () => (Dispatch) => {
  Dispatch({
    type: LOAD_PROFILE,
  });
  const token = localStorage.getItem("jwt_token");
  Axios.get("http://localhost:5000/api/v1/user/me", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      Dispatch({
        type: GET_PROFILE,
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

export const UpdateProfile = (Data) => (Dispatch) => {
  Dispatch({
    type: LOAD_PROFILE,
  });
  const token = localStorage.getItem("jwt_token");
  Axios.put("http://localhost:5000/api/v1/user/profile", Data, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      Dispatch({
        type: GET_PROFILE,
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
