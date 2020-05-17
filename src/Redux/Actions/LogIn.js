const { GET_ERROR, CLEAR_ERROR, SET_CURRENT_USER } = require("../Types/Types");
const Axios = require("axios");
export const loginUser = (Data) => (Dispatch) => {
  Dispatch({
    type: CLEAR_ERROR,
  });
  Axios.post("http://localhost:5000/api/v1/user/login/", Data)
    .then((res) => {
      // Destructuring
      const { token } = res.data;
      //Once Get Response Save To LocalStorage
      localStorage.setItem("jwt_token", token);
      //Decode Data Of User From Token
      setCurrentUser(token, Dispatch);
    })
    .catch((err) => {
      console.log(err.response.data);
      Dispatch({
        type: GET_ERROR,
        Payload: err.response.data.message,
      });
    });
};

// Set Current User
export const setCurrentUser = (token, Dispatch) => {
  Axios.get(`http://localhost:5000/api/v1/user/me/`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      Dispatch({
        type: SET_CURRENT_USER,
        Payload: res.data.data,
      });
    })
    .catch((err) => console.log(err));
};
export const clearError = (_) => ({
  type: CLEAR_ERROR,
});
