import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";
// const API_URL = "https://express-movie-backend.herokuapp.com/";

class MovieDataService {
 getMovie() {
  return axios.get(API_URL + "movies", { headers: authHeader() });
};
 searchMovie(movieName){
  return axios.get(API_URL + `movies?movieName=${movieName}`, { headers: authHeader() });
 }
findMovieByid(movieId) {
  return axios.get(`${API_URL}movies/${movieId}`, { headers: authHeader() });
};
// const createMovie = () => {  
//   return axios.get(API_URL + "movies",{ headers: authHeader() });
// };
 createMovie(data){
  return axios.post(API_URL + "movie", data, { headers: authHeader() });
};
updateMovie(movieId, data) {
  return axios.put(`${API_URL}movie/${movieId}` ,data, { headers: authHeader() });
}

deleteMovie(movieId) {
  return axios.delete(`${API_URL}movie/${movieId}`,{ headers: authHeader() });
}

}
export default new MovieDataService();
