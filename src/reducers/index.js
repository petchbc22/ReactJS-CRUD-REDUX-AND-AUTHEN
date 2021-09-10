import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import movies from "./movies";
import rates from './rates'
import loading from './loading'
export default combineReducers({
  auth,
  message,
  movies,
  rates,
  loading
});
