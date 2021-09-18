import { SET_LOADING, CLEAR_LOADING } from "../actions/types";

const initialState =  {loading: false};

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case SET_LOADING:
      return { loading: true };

    case CLEAR_LOADING:
      return { loading: false };

    default: 
      return state;
  }
}
