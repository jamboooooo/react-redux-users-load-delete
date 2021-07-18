import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { reducer } from "./features/users";

const logger = createLogger({
  diff: true,
  collapsed: true,
});

export const store = createStore(reducer, applyMiddleware(thunk, logger));
