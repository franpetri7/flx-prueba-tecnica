import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import { thunk } from "redux-thunk";

const composeEnhacer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(reducer, composeEnhacer(applyMiddleware(thunk)));

export default store;
