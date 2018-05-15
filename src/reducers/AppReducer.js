import { combineReducers } from "redux";
import loginReducer from "./auth/LoginReducer";
import signupReducer from "./auth/SignupReducer";
import listReducer from "./ListReducer";
import user from "./user";
import appConfig from "./appConfig";
import appState from "./appState";

const appReducer = combineReducers({
  loginReducer,
  signupReducer,
  user,
  appConfig,
  appState,
  listReducer
});

export default appReducer;
