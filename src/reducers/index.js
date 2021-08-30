import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import movie from './movies'

export default combineReducers({
  auth,
  message,
  movie
});
