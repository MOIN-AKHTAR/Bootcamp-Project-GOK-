import { LOAD_PROFILE, GET_PROFILE } from "../Types/Types";
const initialState = {
  loading: false,
  profile: null,
};

export const ProfileReducer = (State = initialState, Action) => {
  switch (Action.type) {
    case LOAD_PROFILE: {
      return {
        ...State,
        loading: true,
      };
    }
    case GET_PROFILE: {
      return {
        ...State,
        profile: Action.Payload,
        loading: false,
      };
    }
    default: {
      return State;
    }
  }
};
