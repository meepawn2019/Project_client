import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
} from "@material-ui/core";
import makeStyle from "@material-ui/styles/makeStyles";
import axios from "axios";
import { loadCurrentUser } from "../redux/action/currentUserAction";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const re =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const useStyles = makeStyle((theme) => ({
  root: {
    height: "100vh",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  auth: {
    maxWidth: 500,
    height: 300,
    // border: "1px solid",
  },
}));

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

function AuthPage(props) {
  const loadUser = props.loadCurrentUser;
  const classes = useStyles();
  const [modalType, setModalType] = useState("login");
  const [checkedBox, setCheckedBox] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePass, setRePass] = useState("");
  const [name, setName] = useState("");
  const [disable, setDisable] = useState(false);
  const [loginGraph] = useMutation(LOGIN_MUTATION);

  const handleRegisterClick = () => {
    setError(false);
    setModalType("register");
    setName("");
    setRePass("");
  };
  const handleLoginClick = () => {
    setError(false);
    setModalType("login");
    // setPassword("");
  };
  const handleForgotClick = () => {
    setError(false);
    setModalType("forgot");
    setPassword("");
  };
  const handleCheckBoxChange = () => {
    setCheckedBox(!checkedBox);
    setReveal(!reveal);
  };
  const handleEmailInput = (event) => {
    setError(false);
    setEmail(event.target.value.trim());
  };
  const handlePasswordInput = (event) => {
    setError(false);
    setPassword(event.target.value.trim());
  };
  const handleRePassInput = (event) => {
    setError(false);
    setRePass(event.target.value.trim());
  };
  const handleNameInput = (event) => {
    setError(false);
    setName(event.target.value.trim());
  };

  const validateInput = () => {
    if (!re.test(email.trim().toLowerCase())) {
      setError(true);
      setErrorText("M???i nh???p ????ng d???ng email");
      return false;
    }

    if (email.trim().length === 0) {
      setError(true);
      setErrorText("Email kh??ng ???????c ????? tr???ng");
      return false;
    }

    if (password.trim().length === 0 && modalType !== "forgot") {
      setError(true);
      setErrorText("M???t kh???u kh??ng ???????c ????? tr???ng");
      return false;
    }

    if (rePass.trim() !== password.trim() && modalType === "register") {
      setError(true);
      setErrorText("M???t kh???u nh???p l???i kh??ng kh???p");
      return false;
    }

    if (rePass.trim() !== password.trim() && modalType === "register") {
      setError(true);
      setErrorText("M???t kh???u nh???p l???i kh??ng kh???p");
      return false;
    }

    if (name.trim().length === 0 && modalType === "register") {
      setError(true);
      setErrorText("T??n kh??ng ???????c ????? tr???ng");
      return false;
    }

    return true;
  };

  const login = () => {
    setDisable(true);
    setError(false);
    axios
      .post(
        "/signInWithEmail",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((data) => {
        let token = data.data.token;
        localStorage.setItem("token", data.data.token);
        axios
          .get("/checkAuthState", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((auth) => {
            setDisable(false);
            loadUser(auth.data.user);
          });
      })
      .catch((e) => {
        console.log(e.response);
        setError(true);
        setDisable(false);
        if (!e.response) return setErrorText("Kh??ng th??? k???t n???i ?????n server");
        switch (e.response?.data.error) {
          case "Email is not verified":
            setErrorText("Vui l??ng x??c th???c email");
            break;
          case "Banned user":
            setErrorText("Ng?????i d??ng ???? b??? c???m ????ng nh???p");
            break;
          default:
            setErrorText("Sai th??ng tin ????ng nh???p ho???c ch??a ????ng k??");
            break;
        }

        //
      });
    loginGraph({ variables: { email, password } })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("tokenAuth", res.data.login.token);
      })
      .catch((err) => {
        console.log("err", { err });
      });
  };

  const register = () => {
    setDisable(true);
    setError(false);
    axios
      .post("/signUpWithEmail", {
        email: email,
        password: password,
        userName: name,
      })
      .then((data) => {
        setDisable(false);
        setModalType("login");
      })
      .catch((e) => {
        console.log(e.response);
        setError(true);
        setErrorText(e.response.data.error);
        setDisable(false);
        if (!e.response.data)
          return setErrorText("Kh??ng th??? k???t n???i t???i server");

        //Password should be at least 6 characters
        //The email address is already in use by another
        switch (e.response.data.error) {
          case "The email address is already in use by another account.":
            setErrorText("Email ???? s??? d???ng");
            break;
          case "Password should be at least 6 characters":
            setErrorText("M???t kh???u y???u");
            break;
          default:
            setErrorText("Sai th??ng tin ????ng k??");
            break;
        }
      });
  };

  const forgot = () => {
    setDisable(true);
    setError(false);
    axios
      .post("/forgetPassword", { email })
      .then((val) => {
        setDisable(false);
        setModalType("login");
      })
      .catch((e) => {
        setDisable(false);
        setError(true);
        if (!e.data) return setErrorText("Kh??ng th??? k???t n???i t???i server");

        setErrorText(e.message);
      });
  };
  const callToServer = () => {
    setError(false);
    switch (modalType) {
      case "login":
        login();
        break;
      case "register":
        register();
        break;
      case "forgot":
        forgot();
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <form className={classes.auth}>
        <FormControl fullWidth={true} className="mb-4">
          <TextField
            label="Email"
            onChange={handleEmailInput}
            id="email"
            defaultValue={email}
          />
        </FormControl>
        {modalType !== "forgot" && (
          <FormControl fullWidth={true} className="mb-4">
            <TextField
              label="M???t kh???u"
              onChange={handlePasswordInput}
              id="password"
              type={reveal ? "text" : "password"}
              defaultValue={password}
            />
          </FormControl>
        )}
        {modalType === "register" && (
          <FormControl fullWidth={true} className="mb-4">
            <TextField
              label="Nh???p l???i m???t kh???u"
              onChange={handleRePassInput}
              id="re-password"
              type={reveal ? "text" : "password"}
              defaultValue={rePass}
            />
          </FormControl>
        )}
        {modalType === "register" && (
          <FormControl fullWidth={true} className="mb-4">
            <TextField
              label="T??n"
              onChange={handleNameInput}
              id="name"
              defaultValue={name}
            />
          </FormControl>
        )}
        {error && <Typography color="error">{errorText}</Typography>}
        {modalType !== "forgot" && (
          <FormControl fullWidth={true}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedBox}
                  onChange={handleCheckBoxChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Hi???n th??? m???t kh???u"
            />
          </FormControl>
        )}
        {modalType === "login" && (
          <FormControl fullWidth={true}>
            <Button
              disabled={disable}
              style={{ width: "150px" }}
              onClick={handleForgotClick}
            >
              Qu??n m???t kh???u
            </Button>
          </FormControl>
        )}
        {modalType === "login" && (
          <FormControl className="float-right mb-4 mt-4">
            <Button
              disabled={disable}
              onClick={handleRegisterClick}
              variant="contained"
              color="secondary"
            >
              ????ng k??
            </Button>
          </FormControl>
        )}
        {modalType !== "login" && (
          <FormControl className=" mb-4 mt-4">
            <Button
              disabled={disable}
              onClick={handleLoginClick}
              variant="contained"
              color="secondary"
            >
              Quay l???i ????ng nh???p
            </Button>
          </FormControl>
        )}
        <FormControl className="float-right mb-4 mt-4">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="mb-3 float-right"
            disabled={disable}
            onClick={(event) => {
              event.preventDefault();
              let valid = validateInput();
              if (valid) callToServer();
            }}
          >
            {modalType === "login" && `????ng nh???p`}
            {modalType === "register" && "????ng k??"}
            {modalType === "forgot" && "X??c nh???n qu??n m???t kh???u"}
          </Button>
        </FormControl>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = {
  loadCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
