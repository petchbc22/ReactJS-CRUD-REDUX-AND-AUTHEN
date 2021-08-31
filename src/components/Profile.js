import React, {  useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { imgDefaultScreen } from "../helpers/fncHelper";
import { retrieveMovie,deleteMovie } from "../actions/movie";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { Edit, Trash } from "react-feather";


const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth) // object;
  const movies = useSelector(state => state.movies); // array
  // const movies = useSelector(state => state.movie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveMovie());
  }, [dispatch]);
  console.log(movies)
 
  // console.log(currentUser.roles);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  const deleteMoviebyID = (movieId) => {
    dispatch(deleteMovie(movieId))
      .then(() => {
        console.log("ส่งไป ลบ ");
        // freshData();
        dispatch(retrieveMovie());
      })
      .catch(() => {
        console.log("err");
      });
    console.log(movieId);
  };
  return (
    <div className="container">
      <div className="row">
        {movies
          ? movies.map((data, index) => {
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
                      <CardText></CardText>
                      <div className="d-flex justify-content-end">
                      {currentUser.roles.includes("ROLE_ADMIN") || currentUser.roles.includes("ROLE_TEAMLEADER") ? (
                        <div className="mr-2">
                          <Button color={"warning"}>
                            <Edit color="white" size={18} />
                          </Button>
                        </div>
                         ) : null}
                        {currentUser.roles.includes("ROLE_ADMIN") ? (
                          <div>
                            <Button
                              color={"danger"}
                              onClick={() => {
                                deleteMoviebyID(data.movieId);
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
          : null}
      </div>

      {/* <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
    </div>
  );
};



export default Profile;