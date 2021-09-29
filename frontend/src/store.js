// To manage global state
import { createStore, combineReducers, applyMiddleware } from "redux";
// To send data from 1 component to another component
import thunk from "redux-thunk";
// To get an option of viewing redu from browseer
import { composeWithDevTools } from "redux-devtools-extension";

// Importing reducers
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// get all reducers in a single variable using combineReducers
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

// Initial State
const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

// communicates between react and redux
const middleware = [thunk];

// creating store object
const store = createStore(
  reducer,
  initialState,
  //   Removed square brackets
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
