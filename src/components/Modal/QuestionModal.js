import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  FormControlLabel,
  Checkbox,
  Select,
  TextField,
  Avatar,
  Typography,
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";
// import Select from "react-select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Editor from "../Editor/Editor";
import makeStyles from "@material-ui/core/styles/makeStyles";
// import "./questionModal.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

const topics = [{ title: "Lập trình" }, { title: "Khác" }];

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    width: "100%",
  },
  userInfo: {
    // margin: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    margin: 10,
  },
  color: {
    backgroundColor: "blue",
  },
  autocomplete: {
    width: "90%",
    margin: 10,
  },

  question: {
    margin: 10,
    width: "90%",
  },
  buttonContainer: {
    // display: "flex",
    // flexDirection: "row",
    // alignItems: "center",
    width: "100%",
    backgroundColor: "red",
  },
  submitButton: {
    float: "right",
    backgroundColor: "orange",
    height: 50,
    padding: 10,
    margin: 10,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    "&:hover": {
      backgroundColor: "#ff6600",
    },
  },
  exitButton: {
    float: "right",
    height: 50,
    padding: 10,
    margin: 10,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
}));

function QuestionModal(props) {
  const handleClose = props.handleModalClose;

  const [question, setQuestion] = useState();
  const [topic, setTopic] = useState("Lập trình");

  const [creating, setCreating] = useState(false);

  const currentUser = props.currentUser;

  const classes = useStyles();

  function onQuestionChange(event) {
    setQuestion(event.target.value);
  }

  function onTopicChange(_, value, reason, cc) {
    setTopic(value?.title || "Lập trình");
  }

  function onSubmit() {
    console.log(question, topic, currentUser._id);
    setCreating(true);
    setTimeout(() => {
      setCreating(false);
    }, 1000);
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3">Đăng câu hỏi</Typography>

      <div className={classes.userInfo}>
        <Avatar
          className={classes.avatar}
          src={currentUser.avatar}
          alt="avatar default"
        />
        <Typography align="center" variant="h5" className={classes.a}>
          {currentUser.userName}
        </Typography>
      </div>

      <div className={classes.autocomplete}>
        <Autocomplete
          disabled={creating}
          defaultValue={topics[0]}
          value={topics[0]}
          options={topics}
          getOptionLabel={(option) => option.title}
          onChange={onTopicChange}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label="Chủ đề"
              variant="outlined"
              // value={topics[1].title}
            />
          )}
        />
      </div>

      <TextField
        className={classes.question}
        label="Câu hỏi"
        id="my-input"
        placeholder="Bắt đầu bằng câu hỏi tại sao vì sao ..."
        autoComplete={"off"}
        required
        disabled={creating}
        onChange={onQuestionChange}
      />

      <div className={classes.buttonContainer}>
        <Button
          className={classes.submitButton}
          variant="contained"
          type="submit"
          onClick={onSubmit}
          disabled={!topic || !question || creating}
        >
          Tiếp
        </Button>
        <Button
          className={classes.exitButton}
          variant="contained"
          onClick={handleClose}
          disabled={creating}
        >
          Hủy
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionModal);
