import { RETRIEVE_RATE } from "./types";
import RateDataService from "../services/rates.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'
toast.configure()

  export const retrieveRate = () => async (dispatch) => {
    try {
      const res = await RateDataService.getRates();
      dispatch({
        type: RETRIEVE_RATE,
        payload: res.data,
      });
    } catch (err) {
      toast.error("Error Network.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      });
      console.log(err);
    }
  };
