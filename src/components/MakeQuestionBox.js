import React, { useState } from "react";
import {
  Button,
  TextField,
  Avatar,
  Typography,
  Dialog,
  DialogContent,
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { connect } from "react-redux";

import { addHomeQuestion } from "../redux/action/homeQuestionAction";
import axios from "axios";

const topics = [{ title: "Lập trình" }, { title: "Khác" }];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    [theme.breakpoints.up(700)]: {
      width: 600,
    },
  },
  userInfo: {
    margin: 10,
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

    margin: 10,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
}));

function MakeQuestionBox(props) {
  const token = localStorage.getItem("token");
  const [question, setQuestion] = useState();
  const [topic, setTopic] = useState("Lập trình");

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const [creating, setCreating] = useState(false);

  const { open, handleModalClose } = props;
  const addHomeQuestion = props.addHomeQuestion;
  const currentUser = props.currentUser;

  const classes = useStyles();

  function onQuestionChange(event) {
    setQuestion(event.target.value);
  }

  function onTopicChange(_, value, reason, cc) {
    setTopic(value?.title || "Lập trình");
  }

  function onSubmit() {
    setCreating(true);
    axios
      .post(
        "/postQuestion",
        {
          question: question,
          topic: [topic],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        let doc = res.data;
        addHomeQuestion({
          question: { ...doc, owner: currentUser },
        });
        setCreating(false);
        handleModalClose();
      })
      .catch((e) => {
        setCreating(false);
        setError(true);
        setErrorText(e.message);
        console.log(e.response);
      });
  }

  return (
    <Dialog open={open} onClose={handleModalClose}>
      <div className={classes.root}>
        <Typography variant="h3">Đăng câu hỏi</Typography>
        <DialogContent>
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
        </DialogContent>
        {error && <div>{errorText}</div>}
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
            onClick={handleModalClose}
            disabled={creating}
          >
            Hủy
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user,
  };
};

const mapDispatchToProps = {
  addHomeQuestion,
};
export default connect(mapStateToProps, mapDispatchToProps)(MakeQuestionBox);
