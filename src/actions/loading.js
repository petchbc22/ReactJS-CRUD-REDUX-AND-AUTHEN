import { SET_LOADING, CLEAR_LOADING } from "./types";

export const setLoading = (message) => ({
  type: SET_LOADING,
  payload: message, 
});

export const clearLoading = () => ({
  type: CLEAR_LOADING,
});
