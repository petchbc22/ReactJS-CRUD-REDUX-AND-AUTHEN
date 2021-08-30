import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { createMovie } from "../actions/movie";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const AddMovie = (props) => {
  console.log(props);
  const [movieTitle, setMovieTitle] = useState("");
  const [yearReleased, setYearReleased] = useState("");
  const [pathIMG, setPathIMG] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        console.log(response);
        alert("หน้าของ admin");
      },
      (error) => {
        alert("หน้าของ admin คุณไม่มีสิทธ์");
        props.history.push("/profile");

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, [props.history]);

  const onChangeMovieTitle = (e) => {
    setMovieTitle(e.target.value);
  };

  const onChangeYearReleased = (e) => {
    setYearReleased(e.target.value);
  };

  const onChangePathIMG = (e) => {
    setPathIMG(e.target.value);
  };

  const saveMovie = () => {
    dispatch(createMovie(movieTitle, yearReleased, pathIMG))
      .then(() => {
        console.log("ส่งไป save ");
        props.history.push("/profile");
      })
      .catch(() => {
        console.log("err");
      });
  };



  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="title">Movie Title</label>
          <input
            type="text"
            className="form-control"
            id="movieTitle"
            required
            value={movieTitle}
            onChange={onChangeMovieTitle}
            name="movieTitle"
          />
        </div>

        <div className="form-group">
          <label htmlFor="yearReleased">Year Released</label>
          <input
            type="text"
            className="form-control"
            id="yearReleased"
            required
            value={yearReleased}
            onChange={onChangeYearReleased}
            name="yearReleased"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pathIMG">Path IMG</label>
          <input
            type="text"
            className="form-control"
            id="pathIMG"
            required
            value={pathIMG}
            onChange={onChangePathIMG}
            name="pathIMG"
          />
        </div>

        <button onClick={saveMovie} className="btn btn-success">
          Submit
        </button>
      </div>
    </div>
  );
};

export default connect(null, { createMovie })(AddMovie);
