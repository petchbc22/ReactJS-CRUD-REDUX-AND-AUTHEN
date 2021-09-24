import { UPDATE_PASSWORD } from "../actions/types";

const initialState = [];

const userReducer = (user = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
  
    case UPDATE_PASSWORD:
      return {
        ...user,
        ...payload,
      };

  
    default:
      return user;
  }
};

export default userReducer;
