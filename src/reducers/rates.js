import { RETRIEVE_RATE } from "../actions/types";

const initialState = [];

const rateReducer = (rates = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
 
    case RETRIEVE_RATE:
      return payload;

  
    default:
      return rates;
  }
};

export default rateReducer;
