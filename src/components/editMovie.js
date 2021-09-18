import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateMovie, findOneMovie } from "../actions/movie";
import { setLoading, clearLoading } from "../actions/loading";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { retrieveRate } from "../actions/rate";
import Select from "react-select";
import { useForm, Controller, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Row, Col, Input } from "reactstrap";
import { imgDefaultScreen } from "../helpers/fncHelper";
import "../App.css";
import { Alert } from "./Alert";

//----------------------------------- Yup config Validation -------------------------------------------------
const validateSchema = yup.object().shape({
  movieTitle: yup.string("movie title is required.").required(),
  yearReleased: yup.number().required().typeError("you must specify a number."),
  ratingMovie: yup
    .array()
    .min(1, "Pick at least 1 tags")
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    )
    .required()
    .nullable(),
});

const EditMovie = (props) => {
  //----------------------------------- STATE AND CONST -------------------------------------------------
  let { movieId } = useParams(); // useParams :movieId
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validateSchema),
    mode: "onSubmit",
  });
  const dispatch = useDispatch();
  // -- state form store --
  const rates = useSelector((state) => state.rates);
  const { movie: currentMovie } = useSelector((state) => state.movies);

  const [successAlert, setSuccessAlert] = useState(false);
  const [confrimAlert, setConfrimAlert] = useState(false);
  const [rateOptions, setRateOptions] = useState([]);
  const [imgPreview, setImgPreview] = useState("");
  const [dataEdit, setDataEdit] = useState({});
  let rateId = useWatch({ control, name: "ratingMovie" }); // getValue form Select

  //----------------------------------- USEEFFECT -------------------------------------------------
  // get Role
  useEffect(() => {
    dispatch(setLoading());
    UserService.getAdminorTeamleaderBoard().then(
      () => {
        dispatch(retrieveRate());
        dispatch(findOneMovie(movieId));
        dispatch(clearLoading());
      },
      (error) => {
        props.history.push("/listpage");
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        } 
      }
    );
  }, [props.history, dispatch, movieId]);
  // get Rate to Option Select
  useEffect(() => {
    let rateData = rates.map((data) => {
      return {
        value: data.rateId,
        label: data.rate,
      };
    });
    setRateOptions(rateData);
  }, [movieId, rates]);
  // get Movie with params and setValue
  useEffect(() => {
    if (currentMovie) {
      if (currentMovie.data) {
        setImgPreview(
          currentMovie.data.pathIMG ? currentMovie.data.pathIMG : null
        );
        let rateMovie = currentMovie.data.rates.length
          ? currentMovie.data.rates.map((data) => {
              return {
                value: data.rateId,
                label: data.rate,
              };
            })
          : [];
        setValue("movieTitle", currentMovie.data.movieName);
        setValue("yearReleased", currentMovie.data.yearReleased);
        setValue("pathIMG", currentMovie.data.pathIMG);
        setValue("ratingMovie", rateMovie);
      }
    }
  }, [currentMovie, setValue]);

  //----------------------------------- FNC ALL -------------------------------------------------
  const submitForm = (input) => {
    if (input !== "") {
      setConfrimAlert(true);
      let getRateId = rateId.map((data) => {
        return data.value;
      });
      let data = {
        movieName: input.movieTitle,
        yearReleased: input.yearReleased,
        pathIMG: input.pathIMG,
        rates: getRateId,
      };
      setDataEdit(data);
    }
  };
  const FncUpdateMovie = () => {
    dispatch(updateMovie(movieId, dataEdit))
      .then(() => {
        setSuccessAlert(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="submit-form">
      <Row>
        <Col md={4}>
          <div className="text-center">
            <img
              className="image-fit pt-3"
              onError={imgDefaultScreen}
              src={imgPreview}
              alt="Card-movie-img"
            />
          </div>
        </Col>
        <Col md={8}>
          <div className="form-group">
            <label htmlFor="title">Movie Title</label>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Movie Title"
                  className={`${errors.movieTitle && "is-invalid"} `}
                />
              )}
              name="movieTitle"
              control={control}
              defaultValue=""
            />

            {errors.movieTitle?.message && (
              <p className="text-left text-danger">
                {errors.movieTitle?.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="yearReleased">Year Released</label>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  maxLength={4}
                  placeholder="Year Released"
                  className={`${errors.yearReleased && "is-invalid"} `}
                />
              )}
              name="yearReleased"
              maxLength={4}
              control={control}
              defaultValue=""
            />
            {errors.yearReleased?.message && (
              <p className="text-left text-danger">
                {errors.yearReleased?.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="pathIMG">Path IMG</label>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="pathIMG"
                  onChange={(e) => {
                    try {
                      setImgPreview(e.target.value);
                      setValue("pathIMG", e.target.value);
                    } catch (e) {
                      console.log("error: ", e);
                    }
                  }}
                />
              )}
              name="pathIMG"
              control={control}
              defaultValue=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="pathIMG">Rating</label>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="rating Movie"
                  className={`${
                    errors.ratingMovie && "select-err is-invalid React"
                  } `}
                  options={rateOptions}
                  isMulti
                />
              )}
              name="ratingMovie"
              control={control}
              defaultValue=""
            />

            {errors.ratingMovie?.message && (
              <p className="text-left text-danger">
                {errors.ratingMovie?.message}
              </p>
            )}
          </div>
        </Col>
        <Col md={12} className="text-center">
          <button
            onClick={handleSubmit(submitForm)}
            className="btn btn-success"
          >
            Submit
          </button>
        </Col>
      </Row>
      <Alert
        showAlert={confrimAlert}
        typeAlert={"create"}
        // id={movieIdDelete}
        nextFnc={() => {
          FncUpdateMovie();
        }}
        closeFnc={() => {
          setConfrimAlert(false);
        }}
      />
      <Alert
        showAlert={successAlert}
        typeAlert={"success"}
        closeFnc={() => {
          setSuccessAlert(false);
          props.history.push("/listpage");
        }}
      />
    </form>
  );
};

export default connect(null, { findOneMovie })(EditMovie);
