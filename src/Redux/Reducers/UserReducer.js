import {
  CREATE_USER,
  LOAD_USER,
  GET_USERS,
  GET_SINGLE_USER,
  UPDATE_USER,
} from "../Types/Types";

const initialState = {
  user: null,
  users: null,
  loading: false,
};

export const UserReducer = (State = initialState, Action) => {
  switch (Action.type) {
    case LOAD_USER: {
      return {
        ...State,
        loading: true,
      };
    }
    case CREATE_USER: {
      return {
        ...State,
        user: Action.Payload,
        loading: false,
      };
    }
    case GET_USERS: {
      return {
        ...State,
        users: Action.Payload,
        loading: false,
      };
    }
    case GET_SINGLE_USER: {
      return {
        ...State,
        user: Action.Payload,
        loading: false,
      };
    }
    case UPDATE_USER: {
      return {
        ...State,
        user: Action.Payload,
        loading: false,
      };
    }
    default: {
      return State;
    }
  }
};
