import {
  POST_UPLOAD,
  LOAD_UPLOADS,
  SET_UPLOADS,
  GET_UPLOAD,
} from "../Types/Types";
const initialState = {
  upload: {},
  uploads: null,
  loading: false,
};

export const UploadReducer = (State = initialState, Action) => {
  switch (Action.type) {
    case POST_UPLOAD: {
      return {
        ...State,
        upload: Action.Payload,
      };
    }
    case LOAD_UPLOADS: {
      return {
        ...State,
        loading: true,
      };
    }
    case SET_UPLOADS: {
      return {
        ...State,
        loading: false,
        uploads: Action.Payload,
      };
    }
    case GET_UPLOAD: {
      return {
        ...State,
        loading: false,
        upload: Action.Payload,
      };
    }
    default: {
      return State;
    }
  }
};
