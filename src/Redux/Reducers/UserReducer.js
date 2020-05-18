import { CREATE_USER, LOAD_USER } from "../Types/Types";
const initialState = {
  user: null,
  users: [],
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
        users: [...State.users, Action.Payload],
        user: Action.Payload,
        loading: false,
      };
    }
    default: {
      return State;
    }
  }
};
