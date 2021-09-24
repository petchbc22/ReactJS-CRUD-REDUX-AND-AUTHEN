import React, { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { imgDefaultScreen } from "../helpers/fncHelper";
import UserService from "../services/user.service";
import { retrieveMovie, deleteMovie, findMoviesName } from "../actions/movie";
import { setLoading, clearLoading } from "../actions/loading";
import { setErrorNetwork } from "../actions/noti";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Badge,
  Input,
} from "reactstrap";
import { Edit, Trash, Search } from "react-feather";
import EventBus from "../common/EventBus";
import { Alert } from "./Alert";
import { useForm, Controller } from "react-hook-form";
const ListPage = () => {
  const { handleSubmit, control } = useForm({ mode: "onSubmit" });
  //----------------------------------- STATE AND CONST -------------------------------------------------
  const dispatch = useDispatch();
  // -- state form store --
  const { user: currentUser } = useSelector((state) => state.auth);
  const movies = useSelector((state) => state.movies);
  // -- state for swal
  const [successAlert, setSuccessAlert] = useState(false);
  const [confrimAlert, setConfrimAlert] = useState(false);
  const [movieIdDelete, setMovieIdDelete] = useState(0);

  //----------------------------------- USEEFFECT -------------------------------------------------
  useEffect(() => {
    dispatch(setLoading());
    UserService.getPublicContent().then(
      (response) => {
        if (response.status === 200) {
          dispatch(retrieveMovie()).then(() => {
            dispatch(clearLoading());
          });
        }
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout"); // if status 401 (unauthorize) redirect to login page.
        } else if (error.response && error.response.status === 403) {
          EventBus.dispatch("logout");
        } else {
          console.log("server down");
          dispatch(clearLoading());
          dispatch(setErrorNetwork());
        }
      }
    );
  }, [dispatch]);


  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  //----------------------------------- FNC ALL -------------------------------------------------

  const deleteMoviebyID = () => {
    dispatch(setLoading());
    dispatch(deleteMovie(movieIdDelete))
      .then(() => {
        setSuccessAlert(true);
        dispatch(retrieveMovie());
        dispatch(clearLoading());
      })
      .catch((res) => {});
  };

  const searchForm = (input) => {
    dispatch(setLoading());
    dispatch(findMoviesName(input.movieName))
      .then((data) => {
        dispatch(clearLoading());
      })
      .catch((res) => {
        console.log(res);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 m-auto d-flex">
          <Controller
            render={({ field }) => (
              <Input {...field} placeholder="Movie Name" type="text" />
            )}
            name="movieName"
            control={control}
            defaultValue=""
          />
          <Button color={"primary"} onClick={handleSubmit(searchForm)}>
            <Search color="white" size={18} />
          </Button>
        </div>
      </div>
      <div className="row">
        {movies.length ? (
          movies.map((data, index) => {
            return (
              <div className="col-md-3" key={index}>
                <Card>
                  <CardImg
                    top
                    width="100%"
                    onError={imgDefaultScreen}
                    src={data.pathIMG}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardTitle tag="h5">{data.movieName}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      Year Released : {data.yearReleased}
                    </CardSubtitle>
                    <CardText>
                      rates :{" "}
                      {data.rates
                        ? data.rates.map((data, index) => {
                            return (
                              <Badge
                                color="primary"
                                className="mr-1"
                                key={index}
                              >
                                {data.rate}
                              </Badge>
                            );
                          })
                        : null}
                    </CardText>
                    <div className="d-flex justify-content-end">
                      {currentUser.roles.includes("ROLE_ADMIN") ||
                      currentUser.roles.includes("ROLE_TEAMLEADER") ? (
                        <div className="mr-2">
                          <Button color={"warning"}>
                            <Link
                              to={{
                                pathname: `/editmovie/${data.movieId}`,
                                state: true,
                              }}
                              className="text-white text-bold"
                            >
                              <Edit color="white" size={18} />
                            </Link>
                          </Button>
                        </div>
                      ) : null}
                      {currentUser.roles.includes("ROLE_ADMIN") ? (
                        <div>
                          <Button
                            color={"danger"}
                            onClick={() => {
                              setMovieIdDelete(data.movieId);
                              setConfrimAlert(true);
                              // deleteMoviebyID(data.movieId);
                            }}
                          >
                            <Trash color="white" size={18} />
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </CardBody>
                </Card>
              </div>
            );
          })
        ) : (
          <div className="col-12 pt-5">
            <h5 className="text-center">No movies.</h5>
          </div>
        )}
      </div>
      <Alert
        showAlert={confrimAlert}
        typeAlert={"delete"}
        id={movieIdDelete}
        nextFnc={() => {
          deleteMoviebyID();
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
        }}
      />
    </div>
  );
};

export default ListPage;
