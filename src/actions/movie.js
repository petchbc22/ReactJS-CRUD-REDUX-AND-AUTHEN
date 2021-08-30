import { CREATE_MOVIE, DELETE_MOVIE } from "./types";

import MovieDataService from "../services/movies.service";

export const createMovie =
  (movieName, yearReleased, pathIMG) => async (dispatch) => {
    try {
      const res = await MovieDataService.createMovie({
        movieName,
        yearReleased,
        pathIMG,
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

//   export const retrieveTutorials = () => async (dispatch) => {
//     try {
//       const res = await TutorialDataService.getAll();

//       dispatch({
//         type: RETRIEVE_TUTORIALS,
//         payload: res.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   export const updateTutorial = (id, data) => async (dispatch) => {
//     try {
//       const res = await TutorialDataService.update(id, data);

//       dispatch({
//         type: UPDATE_TUTORIAL,
//         payload: data,
//       });

//       return Promise.resolve(res.data);
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   };

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

//   export const deleteAllTutorials = () => async (dispatch) => {
//     try {
//       const res = await TutorialDataService.deleteAll();

//       dispatch({
//         type: DELETE_ALL_TUTORIALS,
//         payload: res.data,
//       });

//       return Promise.resolve(res.data);
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   };

//   export const findTutorialsByTitle = (title) => async (dispatch) => {
//     try {
//       const res = await TutorialDataService.findByTitle(title);

//       dispatch({
//         type: RETRIEVE_TUTORIALS,
//         payload: res.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
