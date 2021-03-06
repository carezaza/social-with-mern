import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const middleWares = [reduxThunk];

const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;
