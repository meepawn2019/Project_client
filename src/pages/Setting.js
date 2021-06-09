import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { connect } from "react-redux";
import { Button, IconButton, TextField } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import axios from "axios";
import SnackBar from "@material-ui/core/SnackBar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  home: {
    backgroundColor: "rgb(243, 243, 240)",
    paddingTop: "120px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
    height: "100vh",
    [theme.breakpoints.down(500)]: {
      paddingTop: "90px",
    },
  },
  field: {
    width: "50vw",
    minWidth: 400,
    display: "flex",
    // justifyContent: "center",
    alignContent: "flex-start",
    alignItems: "center",
    justifyItems: "flex-start",
  },
  text: {
    margin: 20,
    // backgroundColor: "red",
  },
  autocomplete: {
    width: "100%",
  },
  buttons: {
    width: "30vw",

    // display: "flex",
    // justifyContent: "center",
    // alignContent: "flex-start",
    // alignItems: "center",
    // justifyItems: "flex-start",
  },
  submit: {
    float: "left",
  },
  cancel: {
    float: "right",
  },
}));

function Setting(props) {
  const classes = useStyles();
  const user = props.currentUser;
  const [enableUserName, setEnableUserName] = useState(false);
  const [enableBio, setEnableBio] = useState(false);
  const [enableGender, setEnableGender] = useState(false);
  const [enableBirth, setEnableBirth] = useState(false);

  const [newUserName, setNewUserName] = useState(user.userName);
  const [newBio, setNewBio] = useState(user.bio);
  const [newGender, setNewGender] = useState(user.gender);
  const [newBirth, setNewBirth] = useState(user.birth);

  const [snackBar, setSnackBar] = useState(false);
  const [snackBarType, setSnackBarType] = useState("warning");
  const [snackBarText, setSnackBarText] = useState("");

  const token = localStorage.getItem("token");

  const onUserNameClick = () => {
    setEnableUserName(true);
    setEnableBio(false);
    setEnableGender(false);
    setEnableBirth(false);
  };
  const onBioClick = () => {
    setEnableUserName(false);
    setEnableBio(true);
    setEnableGender(false);
    setEnableBirth(false);
  };
  const onGenderClick = () => {
    setEnableUserName(false);
    setEnableBio(false);
    setEnableGender(true);
    setEnableBirth(false);
  };
  const onBirthClick = () => {
    setEnableUserName(false);
    setEnableBio(false);
    setEnableGender(false);
    setEnableBirth(true);
  };

  const onUserNameChange = (event) => {
    let text = event.target.value;
    setNewUserName(text);
  };
  const onBioChange = (event) => {
    let text = event.target.value;
    setNewBio(text);
  };
  const onBirthChange = (event) => {
    let text = event.target.value;
    let d = new Date(text + "T00:00");

    setNewBirth(d.toISOString());
  };
  const onGenderChange = (event, val) => {
    setNewGender(val);
  };

  const cancel = () => {
    setEnableUserName(false);
    setEnableBio(false);
    setEnableGender(false);
    setEnableBirth(false);
  };

  const success = () => {
    setSnackBar(true);
    setSnackBarType("success");
    setSnackBarText("Thay đổi thành công");
  };

  const fail = () => {
    setSnackBar(true);
    setSnackBarType("warning");
    setSnackBarText("Lỗi");
  };

  const submit = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (enableBio) {
      axios
        .post("/updateProfile/bio", { bio: newBio }, config)
        .then(() => cancel());
    } else if (enableBirth) {
      let date = new Date(newBirth);

      axios
        .post(
          "/updateProfile/birth",
          {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            date: date.getDate(),
          },
          config
        )
        .then(() => {
          success();
          cancel();
        })
        .catch((e) => {
          fail();
          cancel();
        });
    } else if (enableGender) {
      axios
        .post("/updateProfile/gender", { gender: newGender }, config)
        .then(() => {
          success();
          cancel();
        })
        .catch(() => {
          fail();
          cancel();
        });
    } else if (enableUserName) {
      axios
        .post("/updateProfile/userName", { userName: newUserName }, config)
        .then(() => {
          success();
          cancel();
        })
        .catch(() => {
          fail();
          cancel();
        });
    }
  };

  const isAnyEnable = () => {
    return enableBio || enableBirth || enableGender || enableUserName;
  };
  let date = user.birth ? new Date(user.birth) : null;
  let localDate = "";
  if (date) {
    date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
    localDate = date.toISOString().slice(0, 10);
  }

  const genders = ["Other", "Male", "Female"];

  return (
    <div className={classes.home}>
      <SnackBar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackBar}
        autoHideDuration={3000}
        onClose={() => setSnackBar(false)}
        message="Note archived"
      >
        <Alert onClose={() => setSnackBar(false)} severity={snackBarType}>
          {snackBarText}
        </Alert>
      </SnackBar>
      {enableUserName && <div>Tên</div>}
      {enableBirth && <div>Ngày sinh</div>}
      {enableGender && <div>Giới tính</div>}
      {enableBio && <div>Bio</div>}
      <div>
        <div className={classes.field}>
          <div>Email</div>{" "}
          <TextField
            className={classes.text}
            disabled
            value={`${user.email}`}
            fullWidth
          />
        </div>
        <div className={classes.field}>
          <div>Tên</div>
          <TextField
            className={classes.text}
            disabled={!enableUserName}
            defaultValue={`${user.userName}`}
            fullWidth
            onChange={onUserNameChange}
          />
          <IconButton onClick={onUserNameClick}>
            <Edit />
          </IconButton>
        </div>
        <div className={classes.field}>
          <div>Ngày sinh</div>
          <TextField
            className={classes.text}
            disabled={!enableBirth}
            defaultValue={localDate}
            onChange={onBirthChange}
            type={"date"}
            fullWidth
          />
          <IconButton onClick={onBirthClick}>
            <Edit />
          </IconButton>
        </div>

        <div className={classes.field}>
          <div className={classes.autocomplete}>
            <Autocomplete
              disabled={!enableGender}
              defaultValue={user.gender}
              value={newGender}
              options={genders}
              getOptionLabel={(option) => option}
              onChange={onGenderChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Giới tính"
                  variant="outlined"
                  // value={topics[1].title}
                />
              )}
            />
          </div>
          <IconButton onClick={onGenderClick}>
            <Edit />
          </IconButton>
        </div>

        <div className={classes.field}>
          <div>Bio</div>
          <TextField
            className={classes.text}
            disabled={!enableBio}
            defaultValue={`${user.bio}`}
            onChange={onBioChange}
            fullWidth
          />
          <IconButton onClick={onBioClick}>
            <Edit />
          </IconButton>
        </div>

        <div className={classes.buttons}>
          <Button
            className={classes.submit}
            onClick={submit}
            disabled={!isAnyEnable()}
          >
            Lưu
          </Button>
          <Button
            className={classes.cancel}
            onClick={cancel}
            disabled={!isAnyEnable()}
          >
            Hủy
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser.user,
});

export default connect(mapStateToProps)(Setting);
