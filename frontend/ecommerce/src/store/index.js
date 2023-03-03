import { createEpicMiddleware } from "redux-observable";
import { createStore, applyMiddleware } from "redux";

// helpers
import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";

// Combined reducers
import rootReducer from "../redux/ducks/index";

// // Combined epics
import { default as rootEpic } from "../redux/epics/index";

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: { Observable, ajax },
});

let middleware = [];
middleware.push(epicMiddleware);

export default function store() {
  const store = createStore(rootReducer(), applyMiddleware(...middleware));
  return store;
}
