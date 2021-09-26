import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
// const API_URL = "https://express-movie-backend.herokuapp.com/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all", { headers: authHeader() });
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
 
const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};
 
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getAdminorTeamleaderBoard = () => {
  return axios.get(API_URL + "adminandteamleader", { headers: authHeader() });
};

const updatePassword = (data) => {
  // return axios.post("https://express-movie-backend.herokuapp.com/updateuser", data, { headers: authHeader() });
    return axios.post("http://localhost:8080/updateuser", data, { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAdminorTeamleaderBoard,
  updatePassword
};