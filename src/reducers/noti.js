import { ERR_NETWORK } from "../actions/types";

const initialState =  {noti: false};

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case ERR_NETWORK:
      return { noti: true };

    default: 
      return state;
  }
}
 