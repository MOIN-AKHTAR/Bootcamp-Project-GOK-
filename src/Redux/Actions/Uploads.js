const Axios = require("axios");
const {
  POST_UPLOAD,
  GET_ERROR,
  CLEAR_ERROR,
  LOAD_UPLOADS,
  SET_UPLOADS,
  GET_UPLOAD,
} = require("../Types/Types");

// Upload New Post
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

//Get All Post Of Currently LoggedIn Users
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

// Get A Specific Upload With Some  _id
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

//Update A Specific Upload With _id
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

// Get Uploads Based On Given Month It Includes All User's Upoads
export const GetUploadViaMonth = (Month) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_UPLOADS,
  });
  Axios.get(`http://localhost:5000/api/v1/upload/history/month/${Month}`, {
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

// Get Uploads Based On Given Year It Includes All User's Uploads
export const GetUploadViaYear = (year) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_UPLOADS,
  });
  Axios.get(`http://localhost:5000/api/v1/upload/history/year/${year}`, {
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

// Get Specific User's All Uploads
export const Get_Specific_User_Uploads = (Id) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_UPLOADS,
  });
  Axios.get(`http://localhost:5000/api/v1/user/${Id}/all`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) =>
      Dispatch({
        type: SET_UPLOADS,
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

// Get Specific User's All Uploads Based On Given Month
export const Get_Specific_User_Uploads_Via_Month = (Id, Month) => (
  Dispatch
) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_UPLOADS,
  });
  Axios.get(`http://localhost:5000/api/v1/user/${Id}/month/${Month}`, {
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

// Get Specific User's All Uploads Based On Given Status
export const Get_Specific_User_Uploads_Via_Status = (Id, Status) => (
  Dispatch
) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_UPLOADS,
  });
  Axios.get(`http://localhost:5000/api/v1/user/${Id}/status/${Status}`, {
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

// Approve Upload By Admin
export const Approve_Upload = (Id) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_UPLOADS,
  });
  Axios.patch(`http://localhost:5000/api/v1/upload/approved/${Id}`, {
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
    .catch((err) =>
      Dispatch({
        type: GET_ERROR,
        Payload: {
          message: err.response.data.message,
        },
      })
    );
};

// Reject Upload By Admin
export const Reject_Upload = (Id) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_UPLOADS,
  });
  Axios.patch(`http://localhost:5000/api/v1/upload/reject/${Id}`, {
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
    .catch((err) =>
      Dispatch({
        type: GET_ERROR,
        Payload: {
          message: err.response.data.message,
        },
      })
    );
};

// Pending Upload By Admin
export const Pedn_Upload = (Id) => (Dispatch) => {
  const token = localStorage.getItem("jwt_token");
  Dispatch({
    type: LOAD_UPLOADS,
  });
  Axios.patch(`http://localhost:5000/api/v1/upload/pend/${Id}`, {
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
    .catch((err) =>
      Dispatch({
        type: GET_ERROR,
        Payload: {
          message: err.response.data.message,
        },
      })
    );
};
