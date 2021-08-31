import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";

class RateDataService {
 getRates() {
  return axios.get(API_URL + "rates", { headers: authHeader() });
};


}
export default new RateDataService();
