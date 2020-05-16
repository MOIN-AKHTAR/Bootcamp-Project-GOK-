import { createStore, compose, applyMiddleware } from "redux";
import RootReducer from "./RootReducer";
const thunk = require("redux-thunk").default;
export const Store = createStore(
  RootReducer,
  {},
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
