import { isEmpty } from "../../Utils/isEmpty";
import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "../Types/Types";
const initialState = {
  isAuthenticated: false,
  user: null,
};

export const AuthReducer = (State = initialState, Action) => {
  switch (Action.type) {
    case SET_CURRENT_USER: {
      return {
        ...State,
        isAuthenticated: !isEmpty(Action.Payload),
        user: Action.Payload,
      };
    }
    case CLEAR_CURRENT_USER: {
      return {
        isAuthenticated: false,
        user: null,
      };
    }
    default: {
      return State;
    }
  }
};
