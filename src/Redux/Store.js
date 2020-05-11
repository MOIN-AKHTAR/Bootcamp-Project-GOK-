import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
const initialState = {
  Auth: "",
  User: "",
};
const Reducer = () => {
  return initialState;
};
export const Store = createStore(
  Reducer,
  null,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  )
);
