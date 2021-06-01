import React, { useState, useContext } from "react";
import {
  Button,
  FormControl,
  DialogContent,
  TextField,
} from "@material-ui/core";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import AuthContext from "../../appContext";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
        userName
        role
      }
      token
    }
  }
`;
const REGISTER_MUTATION = gql`
  mutation RegisterMutation(
    $userName: String!
    $email: String!
    $password: String!
  ) {
    register(userName: $userName, email: $email, password: $password) {
      userName
      password
    }
  }
`;

export default function LoginModal(props) {
  const {
    handleRegisterClick,
    handleLoginClick,
    handleForgotClick,
    modalType,
  } = props;

  const { userInformation, setUserInformation } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState({});
  const [login] = useMutation(LOGIN_MUTATION);

  const [register] = useMutation(REGISTER_MUTATION);

  const validate = () => {
    let temp = {};
    temp.email =
      email.length > 0
        ? /^[^\s@]+@[^\s@]+$/.test(email)
          ? ""
          : "Not valid email"
        : "This field is required";
    if (modalType === "register") {
      temp.name = name.length > 0 ? "" : "This field is required";
      temp.repassword = password === repassword ? "" : "Not match password";
    }
    temp.password = password.length > 0 ? "" : "This field is required";
    setError({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const registerClick = () => {
    handleRegisterClick();
    setError({});
  };

  const loginClick = () => {
    handleLoginClick();
    setError({});
  };

  const forgotClick = () => {
    handleForgotClick();
    setError({});
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // if (validate()) {
    //   if (modalType === "register") {
    //     register({ variables: { userName: name, email, password } });
    //   } else if (modalType === "login") {
    //     login({ variables: { email, password } })
    //       .then((res) => {
    //         console.log(res.data);
    //         // setUserInformation(res.data.user);
    //         localStorage.setItem("token", res.data.login.token);
    //         store.dispatch(userAction.login(res.data.login.user));
    //         window.location.reload();
    //       })
    //       .catch((err) => {
    //         if (
    //           err.message === "No such user found" ||
    //           err.message === "Invalid password"
    //         ) {
    //           setError({
    //             email: "Sai tai khoan hoac mat khau",
    //             password: "Sai tai khoan hoac mat khau",
    //           });
    //         } else if (err.message === "Banned Account") {
    //           setError({
    //             email: "Tai khoan cua ban da bi khoa",
    //           });
    //         }
    //       });
    //   }
    // }
    // console.log(error);
  };

  const handleEmailChange = (v) => {
    setEmail(v.target.value);
  };
  const handleNameChange = (v) => {
    setName(v.target.value);
  };
  const handlePasswordChange = (v) => {
    setPassword(v.target.value);
  };
  const handleRePasswordChange = (v) => {
    setRePassword(v.target.value);
  };

  return (
    <div>
      <DialogContent dividers>
        <form>
          <FormControl fullWidth={true} className="mb-4">
            <TextField
              id="my-email"
              aria-describedby="my-helper-text"
              label="Email"
              variant="outlined"
              onChange={handleEmailChange}
              {...(error.email && {
                error: true,
                helperText: error.email,
              })}
            />
          </FormControl>
          {modalType === "register" && (
            <FormControl fullWidth={true} className="mb-4">
              <TextField
                id="my-name"
                aria-describedby="my-helper-text"
                label="Name"
                variant="outlined"
                onChange={handleNameChange}
                {...(error.name && {
                  error: true,
                  helperText: error.name,
                })}
              />
            </FormControl>
          )}
          {modalType !== "forgot" && (
            <FormControl fullWidth={true} className="mb-4">
              <TextField
                id="my-password"
                aria-describedby="my-helper-text"
                label="Password"
                variant="outlined"
                type="password"
                onChange={handlePasswordChange}
                {...(error.password && {
                  error: true,
                  helperText: error.password,
                })}
              />
            </FormControl>
          )}{" "}
          {modalType === "register" && (
            <FormControl fullWidth={true} className="mb-4">
              <TextField
                id="my-re-password"
                aria-describedby="my-helper-text"
                label="Re Password"
                variant="outlined"
                type="password"
                onChange={handleRePasswordChange}
                {...(error.repassword && {
                  error: true,
                  helperText: error.repassword,
                })}
              />
            </FormControl>
          )}
          {modalType === "login" && (
            <FormControl fullWidth={true}>
              <Button
                style={{ width: "150px" }}
                onClick={forgotClick}
              >{`Quên mật khẩu`}</Button>
            </FormControl>
          )}
          {modalType === "forgot" && (
            <FormControl className="mb-4 mt-4">
              <Button
                style={{ width: "150px" }}
                onClick={loginClick}
              >{`Đăng nhập`}</Button>
            </FormControl>
          )}
          {modalType === "login" && (
            <FormControl className="mb-4 mt-4">
              <Button
                onClick={registerClick}
                variant="contained"
                color="secondary"
              >
                {`Đăng ký`}
              </Button>
            </FormControl>
          )}
          {modalType === "register" && (
            <FormControl className="mb-4 mt-4">
              <Button
                onClick={loginClick}
                variant="contained"
                color="secondary"
              >
                {`Đăng nhập`}
              </Button>
            </FormControl>
          )}
          <FormControl className="float-right mb-4 mt-4">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="mb-3 float-right"
              onClick={handleSubmitForm}
            >
              {modalType === "login" && `Đăng nhập`}
              {modalType === "register" && "Đăng ký"}
              {modalType === "forgot" && "Xác nhận quên mật khẩu"}
            </Button>
          </FormControl>
        </form>
      </DialogContent>
    </div>
  );
}
