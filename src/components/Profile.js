import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import UserService from "../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, clearLoading } from "../actions/loading";
import { setErrorNetwork } from "../actions/noti";
import { Button, Collapse, CardBody, Card, Input } from "reactstrap";
import { Key } from "react-feather";
import EventBus from "../common/EventBus";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePassword } from "../actions/user";
import { Alert } from "./Alert";
// validateSchema for Yup
const validateSchema = yup.object().shape({
  oldPassword: yup.string().required(),
  newPassword: yup
    .string()
    .required()
    .min(6, "Password must be at least 6 characters"),
  conPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});
const Profile = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue
  } = useForm({
    resolver: yupResolver(validateSchema),
    mode: "onSubmit",
  });
  //----------------------------------- STATE AND CONST -------------------------------------------------
  const dispatch = useDispatch();
  // -- state form store --
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [successAlert, setSuccessAlert] = useState(false);
  const [confrimAlert, setConfrimAlert] = useState(false);
  const toggle = (e) => {
    setIsOpen(!isOpen);
  };
  //----------------------------------- USEEFFECT -------------------------------------------------
  useEffect(() => {
    dispatch(setLoading());
    UserService.getPublicContent().then(
      (response) => {
        if (response.status === 200) {
          //   dispatch(retrieveMovie()).then(() => {
          dispatch(clearLoading());
          //   });
        }
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout"); // if status 401 (unauthorize) redirect to login page.
        } else if (error.response && error.response.status === 403) {
          EventBus.dispatch("logout");
        } else {
          dispatch(clearLoading());
          dispatch(setErrorNetwork());
        }
      }
    );
  }, [dispatch]);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const submitForm = (input) => {
    if (input) {
      let data = {
        oldpassword: input.oldPassword,
        password: input.newPassword,
        email: currentUser.email,
      };
      setDataUpdate(data);
      setConfrimAlert(true);
    }
  };
  const FncUpdatePassword = () => {
    dispatch(updatePassword(dataUpdate))
      .then(() => {
        setSuccessAlert(true);
        setIsOpen(!isOpen);
        setValue('oldPassword', '')
        setValue('newPassword', '')
        setValue('conPassword', '')
      })
      .catch((err) => {
        setError("oldPassword", {
          type: "manual",
          message: err.response.data.message,
        });
      });
  };

  return (
    <>
      <Alert
        showAlert={confrimAlert}
        typeAlert={"edit"}
        // id={movieIdDelete}
        nextFnc={() => {
          FncUpdatePassword();
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
      <div className="row">
        <div className="col-6 m-auto">
          <h5 className="text-bold">profile</h5>
          <p>
            <strong>Username:</strong> {currentUser.username}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
          <Button color={"primary"} type="button" onClick={toggle}>
            <Key color="white" size={18} /> Edit Password
          </Button>
          <Collapse isOpen={isOpen}>
            <Card>
              <CardBody>
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Old Password</label>
                    <Controller
                      render={({ field }) => (
                        <Input
                          type="password"
                          {...field}
                          placeholder="Old Password"
                          className={`${errors.oldPassword && "is-invalid"} `}
                        />
                      )}
                      name="oldPassword"
                      control={control}
                      defaultValue=""
                    />
                    {errors.oldPassword?.message && (
                      <p className="text-left text-danger">
                        {errors.oldPassword?.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">New Password</label>
                    <Controller
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="password"
                          placeholder="New Password"
                          className={`${errors.newPassword && "is-invalid"} `}
                        />
                      )}
                      name="newPassword"
                      control={control}
                      defaultValue=""
                    />
                    {errors.newPassword?.message && (
                      <p className="text-left text-danger">
                        {errors.newPassword?.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Confrim Password</label>
                    <Controller
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confrim Password"
                          className={`${errors.conPassword && "is-invalid"} `}
                        />
                      )}
                      name="conPassword"
                      control={control}
                      defaultValue=""
                    />
                    {errors.conPassword?.message && (
                      <p className="text-left text-danger">
                        {errors.conPassword?.message}
                      </p>
                    )}
                  </div>
                  <div className="col-md-12 text-center">
                    <button
                      onClick={handleSubmit(submitForm)}
                      className="btn btn-success"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Collapse>
        </div>
      </div>
    </>
  );
};
export default Profile;
