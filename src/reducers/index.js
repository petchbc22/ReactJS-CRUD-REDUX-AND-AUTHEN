import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import movies from "./movies";

export default combineReducers({
  auth,
  message,
  movies
});
