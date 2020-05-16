import { combineReducers } from "redux";
import { AuthReducer } from "./Reducers/AuthReducer";
import { ErrorReducer } from "./Reducers/ErrorReducer";
import { UploadReducer } from "./Reducers/UploadsReducer";
export default combineReducers({
  auth: AuthReducer,
  error: ErrorReducer,
  upload: UploadReducer,
});
