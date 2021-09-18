import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
// import Register from "./components/Register";
import ListPage from "./components/ListPage";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import { Power, LogIn } from "react-feather";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./components/Spinner";
import { setLoading, clearLoading } from "./actions/loading";
import { setErrorNetwork } from "./actions/noti";
toast.configure(); 

const App = () => {
  //----------------------------------- STATE AND CONST -------------------------------------------------
  // global state 
  const { loading } = useSelector((state) => state.loading);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const { noti } = useSelector((state) => state.noti);
  const dispatch = useDispatch();
  // state
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  //----------------------------------- FNC ALL -------------------------------------------------
  const logOut = useCallback(() => {
    dispatch(setLoading());
    dispatch(logout());
    dispatch(clearLoading());
  }, [dispatch]);
  //----------------------------------- USEEFFECT -------------------------------------------------
  //clear message
  useEffect(() => {
    history.listen(() => {
      dispatch(clearMessage()); // clear message when changing location
    });
    if (message === 404) {
      dispatch(setErrorNetwork());
    }
  }, [dispatch,message]);

// if currentUser is true (login)
  useEffect(() => {
    if (currentUser) {
      if (
        currentUser.roles.includes("ROLE_ADMIN") ||
        currentUser.roles.includes("ROLE_TEAMLEADER")
      ) {
        setShowAdminBoard(true);
      }
    } else {
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  // if global state noti is true render toast noti.
  useEffect(() => {
    if (noti === true) {
      toast.error(`Network Error.`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  }, [noti]);

  return (
    <Router history={history}>
      {/* for global state === setloading */}
      {loading === true ? <Spinner /> : null}
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand mb-0">
            Movie CRUD
          </Link>
          <div className="navbar-nav mr-auto">
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/addmovie"} className="nav-link">
                  addmovie
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <p className="nav-link mb-0">
                  Welcome : {currentUser.username}
                </p>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  <Power color="white" size={18} />
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  <LogIn color="white" size={18} />
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li> */}
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/listpage"]} component={ListPage} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/register" component={Register} /> */}
            <Route exact path="/listpage" component={ListPage} />
            <Route exact path="/editmovie/:movieId" component={EditMovie} />
            <Route path="/addmovie" component={AddMovie} />
          </Switch>
        </div>
        <AuthVerify logOut={logOut} />
      </div>
    </Router>
  );
};

export default App;
