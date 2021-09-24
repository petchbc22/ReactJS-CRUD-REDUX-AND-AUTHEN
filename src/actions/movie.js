import { CREATE_MOVIE, DELETE_MOVIE,RETRIEVE_MOVIE, UPDATE_MOVIE,FIND_MOVIE_BY_ID,SET_MESSAGE } from "./types";
import MovieDataService from "../services/movies.service";
import '../App.css'
export const createMovie =
  (movieName, yearReleased, pathIMG,rates) => async (dispatch) => {
    try {
      const res = await MovieDataService.createMovie({
        movieName,
        yearReleased,
        pathIMG,
        rates
      });

      dispatch({
        type: CREATE_MOVIE,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const retrieveMovie = () => async (dispatch) => {
    try {
      const res = await MovieDataService.getMovie();

      dispatch({
        type: RETRIEVE_MOVIE,
        payload: res.data,
      });
    } catch (err) {
      if(err.response.status === 401){
        return Promise.reject(err.response.status);
      }
      else{
        dispatch({
          type: SET_MESSAGE,
          payload: err.response.status,
        });
      }
     
    } 
  };

  export const updateMovie = (movieId, data) => async (dispatch) => {
    try {
      const res = await MovieDataService.updateMovie(movieId, data);

      dispatch({
        type: UPDATE_MOVIE,
        payload: { movie: res.data },
        
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const deleteMovie = (movieId) => async (dispatch) => {
  try {
    await MovieDataService.deleteMovie(movieId);

    dispatch({
      type: DELETE_MOVIE,
      payload: { movieId },
    });
  } catch (err) {
    console.log(err);
  }
};

  export const findOneMovie = (MovieId) => (dispatch) => {
    return MovieDataService.findMovieByid(MovieId).then(
      (data) => {
        dispatch({
          type: FIND_MOVIE_BY_ID,
          payload:{ movie: data },
        });
  
        return Promise.resolve();
      },
      (err) => {
        dispatch({
          type: SET_MESSAGE,
          payload: err.response.status,
        });
      }
    )
  };

  export const findMoviesName = (movieName) => async (dispatch) => {
    try {
      const res = await MovieDataService.searchMovie(movieName);
  
      dispatch({
        type: RETRIEVE_MOVIE,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
 
  