import { CREATE_USER, CLEAR_ERROR, GET_ERROR } from "../Types/Types";
import Axios from "axios";

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
      console.log(res.data.data);
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
