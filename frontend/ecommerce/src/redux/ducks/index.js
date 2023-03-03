import { combineReducers } from "redux";
// import { connectRouter } from "connected-react-router";

// Reducers
import { reducer as adminDucks } from "./adminDucks";
import { reducer as shopReducer } from "./shopDucks";
import { reducer as nevigationReducer } from "./navigationDucks";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const state = {
    adminProductState: adminDucks,
    shopReducerState: shopReducer,
    navigationState: nevigationReducer,
    // router: connectRouter(history),
  };
  return combineReducers(state);
};
