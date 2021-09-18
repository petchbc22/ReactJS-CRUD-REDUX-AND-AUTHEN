import React from "react";
import PulseLoader from "react-spinners/ClipLoader";
import '../App.css'

const Spinner = () =>{
    return(
        <div className="containerLoading">
        <div className="centerOfScreen">
          <PulseLoader color={"#fff"} loading={true} size={150} />
        </div>
      </div>
    )
}
export default Spinner 