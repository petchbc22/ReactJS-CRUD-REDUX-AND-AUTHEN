import { UPDATE_PASSWORD } from "./types";

import userService from "../services/user.service";

export const updatePassword = (data) => async (dispatch) => {
  try {
    const res = await userService.updatePassword(data);

    dispatch({
      type: UPDATE_PASSWORD,
      payload: { user: res.data },
      
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
