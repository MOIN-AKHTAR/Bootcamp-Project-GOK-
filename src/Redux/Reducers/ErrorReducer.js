import { GET_ERROR, CLEAR_ERROR } from "../Types/Types";

const initialState = "";
export const ErrorReducer = (State = initialState, Action) => {
  switch (Action.type) {
    case GET_ERROR: {
      return Action.Payload;
    }
    case CLEAR_ERROR: {
      return null;
    }
    default: {
      return State;
    }
  }
};
