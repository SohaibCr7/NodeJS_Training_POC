/* eslint-disable import/no-anonymous-default-export */
import { Observable } from "rxjs";

import { combineEpics } from "redux-observable";

import adminEpic from "./adminEpic";
import shopEpic from "./shopEpic";

export default (...args) => {
  return combineEpics(adminEpic, shopEpic)(...args, { Observable });
};
