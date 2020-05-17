const {
  POST_UPLOAD,
  GET_ERROR,
  CLEAR_ERROR,
  LOAD_UPLOADS,
  SET_UPLOADS,
  GET_UPLOAD,
} = require("../Types/Types");
const Axios = require("axios");

export const Upload_Post = (Data) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: CLEAR_ERROR,
  });
  Axios.post("http://localhost:5000/api/v1/upload/", Data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      return Dispatch({
        type: POST_UPLOAD,
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

export const Get_Uploads = (_) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_UPLOADS,
  });
  Axios.get("http://localhost:5000/api/v1/upload/all/", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      Dispatch({
        type: SET_UPLOADS,
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

export const Get_Upload = (id) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_UPLOADS,
  });
  Axios.get(`http://localhost:5000/api/v1/upload/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) =>
      Dispatch({
        type: GET_UPLOAD,
        Payload: res.data.data,
      })
    )
    .catch((err) => {
      Dispatch({
        type: GET_ERROR,
        Payload: {
          message: err.response.data.message,
        },
      });
    });
};

export const UpdateUpload = (Id, Data) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_UPLOADS,
  });
  Axios.put(`http://localhost:5000/api/v1/upload/${Id}/`, Data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      Dispatch({
        type: GET_UPLOAD,
        Payload: res.data.data,
      });
      // console.log(res.data);
      // histoy.push("/myUploads");
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

export const GetUploadViaMonth = (Month) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_UPLOADS,
  });
  Axios.get(`http://localhost:5000/api/v1/upload//history/month/${Month}`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      Dispatch({
        type: SET_UPLOADS,
        Payload: res.data.data,
      });
    })
    .catch((err) =>
      Dispatch({
        type: GET_ERROR,
        Payload: {
          message: err.response.data.message,
        },
      })
    );
};

export const GetUploadViaYear = (year) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_UPLOADS,
  });
  Axios.get(`http://localhost:5000/api/v1/upload//history/year/${year}`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      Dispatch({
        type: SET_UPLOADS,
        Payload: res.data.data,
      });
    })
    .catch((err) =>
      Dispatch({
        type: GET_ERROR,
        Payload: {
          message: err.response.data.message,
        },
      })
    );
};
