import { CREATE_USER, LOAD_USER, GET_USERS } from "../Types/Types";
const initialState = {
  user: null,
  // user:[]
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
    default: {
      return State;
    }
  }
};
