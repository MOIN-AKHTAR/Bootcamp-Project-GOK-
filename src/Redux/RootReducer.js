import { combineReducers } from "redux";
import { UserReducer } from "./Reducers/UserReducer";
import { AuthReducer } from "./Reducers/AuthReducer";
import { ErrorReducer } from "./Reducers/ErrorReducer";
import { UploadReducer } from "./Reducers/UploadsReducer";
import { ProfileReducer } from "./Reducers/ProfileReducer";
export default combineReducers({
  auth: AuthReducer,
  error: ErrorReducer,
  upload: UploadReducer,
  profile: ProfileReducer,
  user: UserReducer,
});
