import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import makeStyle from "@material-ui/styles/makeStyles";
import axios from "axios";
import { loadCurrentUser } from "../redux/action/currentUserAction";
import { connect } from "react-redux";

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

function ChangePassword(props) {
  const token = localStorage.getItem("token");
  const loadUser = props.loadCurrentUser;
  const classes = useStyles();
  const [checkedBox, setCheckedBox] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const [snackBar, setSnackBar] = useState(false);

  const handleCheckBoxChange = () => {
    setCheckedBox(!checkedBox);
    setReveal(!reveal);
  };
  const handlePasswordInput = (event) => {
    setError(false);
    setPassword(event.target.value.trim());
  };
  const handleNewPasswordInput = (event) => {
    setError(false);
    setNewPassword(event.target.value.trim());
  };

  const validateInput = () => {
    if (!password.trim()) {
      setError(true);
      setErrorText("Mật khẩu không được để trống");
      return false;
    }
    if (!newPassword.trim()) {
      setError(true);
      setErrorText("Mật khẩu mới không được để trống");
      return false;
    }

    if (newPassword.trim() === password.trim()) {
      setError(true);
      setErrorText("Mật khẩu mới phải khác mật khẩu cũ");
      return false;
    }

    return true;
  };

  const callToServer = () => {
    setDisable(true);
    setError(false);
    axios
      .post(
        "/changePassword",
        {
          password,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setDisable(false);
        setSnackBar(true);
      })
      .catch((e) => {
        console.log(e.response);
        setErrorText(e.response?.data?.error || "Đã xảy ra lỗi ngoài ý muốn");
        if (
          e.response?.data?.error ===
          "The password is invalid or the user does not have a password"
        ) {
          setErrorText("Sai mật khẩu");
        } else {
          setErrorText("Mật khẩu mới không hợp lệ");
        }

        setError(true);
        setDisable(false);
      });
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackBar}
        autoHideDuration={3000}
        onClose={() => setSnackBar(false)}
        message="Note archived"
      >
        <Alert onClose={() => setSnackBar(false)} severity="success">
          Đổi mật khẩu thành công
        </Alert>
      </Snackbar>
      <form className={classes.auth}>
        <FormControl fullWidth={true} className="mb-4">
          <TextField
            disabled={disable}
            label="Mật khẩu"
            onChange={handlePasswordInput}
            id="password"
            type={reveal ? "text" : "password"}
            defaultValue={password}
          />
        </FormControl>

        <FormControl fullWidth={true} className="mb-4">
          <TextField
            disabled={disable}
            label="Mật khẩu mới"
            onChange={handleNewPasswordInput}
            id="new-password"
            type={reveal ? "text" : "password"}
            defaultValue={newPassword}
          />
        </FormControl>

        {error && <Typography color="error">{errorText}</Typography>}

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

        <FormControl className="float-right mb-4 mt-4">
          <Button
            variant="contained"
            color="primary"
            className="mb-3 float-right"
            disabled={disable}
            onClick={(event) => {
              let valid = validateInput();
              if (valid) callToServer();
            }}
          >
            Đổi mật khẩu
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
