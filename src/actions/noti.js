import { ERR_NETWORK} from "./types";

export const setErrorNetwork = (message) => ({
  type: ERR_NETWORK,
  payload: message,
});
 
 