import {
  CREATE_MOVIE,
  DELETE_MOVIE,
  RETRIEVE_MOVIE,
  UPDATE_MOVIE,
  FIND_MOVIE_BY_ID,
} from "../actions/types";

const initialState = [];

const movieReducer = (movies = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_MOVIE:
      return [...movies, payload];

    case RETRIEVE_MOVIE:
      return payload; 

    case FIND_MOVIE_BY_ID:
      return {
        ...movies,
        movie: payload.movie,
      };

    case UPDATE_MOVIE:
      return {
        ...movies,
        ...payload,
      };

    case DELETE_MOVIE:
      return movies.filter(({ movieId }) => movieId !== payload.movieId);

    default:
      return movies;
  }
};

export default movieReducer;
