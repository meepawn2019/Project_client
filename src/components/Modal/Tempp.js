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

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const useStyles = makeStyle((theme) => ({
  root: {
    height: "100vh",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  auth: {
    width: 500,
    height: 300,
    // border: "1px solid",
  },
}));

export default function Tempp(props) {
  const setId = props.setId;
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

  const handleRegisterClick = () => {
    setError(false);
    setModalType("register");
  };
  const handleLoginClick = () => {
    setError(false);
    setModalType("login");
    setRePass("");
    setName("");
  };
  const handleForgotClick = () => {
    setError(false);
    setModalType("forgot");
    setPassword("");
    setRePass("");
    setName("");
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
      setErrorText("Mời nhập đúng dạng email");
      return false;
    }

    if (email.trim().length === 0) {
      setError(true);
      setErrorText("Email không được để trống");
      return false;
    }

    if (password.trim().length === 0 && modalType !== "forgot") {
      setError(true);
      setErrorText("Mật khẩu không được để trống");
      return false;
    }

    if (rePass.trim() !== password.trim() && modalType === "register") {
      setError(true);
      setErrorText("Mật khẩu nhập lại không khớp");
      return false;
    }

    if (rePass.trim() !== password.trim() && modalType === "register") {
      setError(true);
      setErrorText("Mật khẩu nhập lại không khớp");
      return false;
    }

    if (name.trim().length === 0 && modalType === "register") {
      setError(true);
      setErrorText("Tên không được để trống");
      return false;
    }

    return true;
  };

  const login = () => {
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
        axios
          .get("/checkAuthState", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((auth) => setId(auth.data.user.id));
      })
      .catch((e) => {
        setError(true);
        // console.log(e.response);
        // setErrorText("sai");
        switch (e.response.data.error) {
          case "Email is not verified":
            setErrorText("Vui lòng xác thực email");
            break;
          default:
            setErrorText("Sai thông tin đăng nhập hoặc chưa đăng ký");
            break;
        }

        //
      });
  };

  const register = () => {
    setError(false);
    axios
      .post("/signUpWithEmail", {
        email: email,
        password: password,
        userName: name,
      })
      .then((data) => {
        setModalType("login");
      })
      .catch((e) => {
        console.log(e.response);
        setError(true);
        setErrorText(e.response.data.error);

        //Password should be at least 6 characters
        //The email address is already in use by another

        switch (e.response.data.error) {
          case "The email address is already in use by another account.":
            setErrorText("Email đã sử dụng");
            break;
          case "Password should be at least 6 characters.":
            setErrorText("Mật khẩu yếu");
            break;
          default:
            setErrorText("Sai thông tin đăng ký");
            break;
        }
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
              label="Mật khẩu"
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
              label="Nhập lại mật khẩu"
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
              label="Tên"
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
              label="Hiển thị mật khẩu"
            />
          </FormControl>
        )}
        {modalType === "login" && (
          <FormControl fullWidth={true}>
            <Button style={{ width: "150px" }} onClick={handleForgotClick}>
              Quên mật khẩu
            </Button>
          </FormControl>
        )}
        {modalType === "login" && (
          <FormControl className="mb-4 mt-4">
            <Button
              onClick={handleRegisterClick}
              variant="contained"
              color="secondary"
            >
              {`Đăng ký`}
            </Button>
          </FormControl>
        )}
        {modalType !== "login" && (
          <FormControl className="mb-4 mt-4">
            <Button
              onClick={handleLoginClick}
              variant="contained"
              color="secondary"
            >
              Quay lại đăng nhập
            </Button>
          </FormControl>
        )}
        <FormControl className="float-right mb-4 mt-4">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="mb-3 float-right"
            onClick={(event) => {
              event.preventDefault();
              let valid = validateInput();
              if (valid) callToServer();
              // console.log({ email, password, rePass, name });
            }}
          >
            {modalType === "login" && `Đăng nhập`}
            {modalType === "register" && "Đăng ký"}
            {modalType === "forgot" && "Xác nhận quên mật khẩu"}
          </Button>
        </FormControl>
      </form>
    </div>
  );
}
