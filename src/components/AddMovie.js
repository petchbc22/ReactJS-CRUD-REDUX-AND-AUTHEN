import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { createMovie } from "../actions/movie";
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
// validateSchema for Yup
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

const AddMovie = (props) => {
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
  const rates = useSelector((state) => state.rates); // array
  const [successAlert, setSuccessAlert] = useState(false);
  const [confrimAlert, setConfrimAlert] = useState(false);
  const [rateOptions, setRateOptions] = useState([]);
  const [imgPreview, setImgPreview] = useState("");
  const [dataCreate, setDataCreate] = useState({
    movieTitle: "",
    yearReleased: "",
    pathIMG: "",
    getRateId: [],
  });
  let rateId = useWatch({ control, name: "ratingMovie" });

  useEffect(() => {
    UserService.getAdminorTeamleaderBoard().then(
      (response) => {
        dispatch(retrieveRate());
      },
      (error) => {
        // alert("หน้าของ admin คุณไม่มีสิทธ์");
        props.history.push("/listpage");

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout"); 
        }
      }
    );
  }, [props.history, dispatch]);

  useEffect(() => {
    let rateData = rates.map((data) => {
      return {
        value: data.rateId,
        label: data.rate,
      };
    });
    setRateOptions(rateData);
  }, [rates]);

  const submitForm = (input) => {
    if (input !== "") {
      setConfrimAlert(true);
      let getRateId = rateId.map((data) => {
        return data.value;
      });
      let data = {
        movieTitle: input.movieTitle,
        yearReleased: input.yearReleased,
        pathIMG: input.pathIMG,
        getRateId: getRateId,
      };
      setDataCreate(data);
    }
  };
  const fncCreateMovie = () => {
    dispatch(
      createMovie(
        dataCreate.movieTitle,
        dataCreate.yearReleased,
        dataCreate.pathIMG,
        dataCreate.getRateId
      )
    )
      .then(() => {
        setSuccessAlert(true);
      })
      .catch(() => {
        console.log("err");
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
          fncCreateMovie();
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

export default connect(null, { createMovie })(AddMovie);
