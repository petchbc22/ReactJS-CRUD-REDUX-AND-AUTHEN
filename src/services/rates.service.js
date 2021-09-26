import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";
// const API_URL = "https://express-movie-backend.herokuapp.com/";

class RateDataService {
 getRates() {
  return axios.get(API_URL + "rates", { headers: authHeader() });
};


}
export default new RateDataService();
