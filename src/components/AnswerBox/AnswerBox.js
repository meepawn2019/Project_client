import React, { useState } from "react";
import Editor from "../Editor/Editor";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./answerBox.css";

import { writeAnAnswer } from "../../redux/action/answerInQuestionAction";
import { connect } from "react-redux";
import axios from "axios";

const useStyles = makeStyles({
  // root: {
  //   width: "90vw",
  // height: "50vh",
  // },
  container: {
    boxShadow: "0 2px 15px rgb(0 0 0 / 22%)",
    backgroundColor: "white",
  },
  button: {
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
});
function AnswerBox(props) {
  const token = localStorage.getItem("token");
  const questionId = props.questionId;
  const user = props.user;
  const writeAnAnswer = props.writeAnAnswer;

  const { onClose, open } = props;
  const [detailAnswer, setDetailAnswer] = useState("");
  const [creating, setCreating] = useState(false);

  function handleDetailAnswer(event) {
    setDetailAnswer(event);
  }

  const handleClick = () => {
    setCreating(true);
    axios
      .post(
        "/postComment",
        { question: questionId, answer: detailAnswer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((doc) => {
        setCreating(false);
        console.log({ ...doc.data, owner: user });
        writeAnAnswer({
          id: questionId,
          content: { ...doc.data, owner: user },
        });
        onClose();
      })
      .catch((e) => {
        console.log(e);
      });

    // call api
  };

  const classes = useStyles();

  return (
    <Dialog onClose={onClose} open={open}>
      <div className={classes.root}>
        <div className={`${classes.container} answer`}>
          <DialogTitle>Trả lời</DialogTitle>
          <Editor onChange={handleDetailAnswer} />

          <Button
            className={classes.button}
            onClick={handleClick}
            disabled={!detailAnswer || creating}
          >
            Đăng
          </Button>
          <Button
            className={classes.exitButton}
            disabled={creating}
            onClick={onClose}
          >
            Hủy
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.currentUser.user,
//   };
// };
const mapDispatchToProps = {
  writeAnAnswer,
};

export default connect(null, mapDispatchToProps)(AnswerBox);
