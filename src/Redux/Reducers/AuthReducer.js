import { SET_CURRENT_USER } from "../Types/Types";
import { isEmpty } from "../../Utils/isEmpty";
const initialState = {
  isAuthenticated: false,
  user: {},
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
    default: {
      return State;
    }
  }
};
