import React, { useState } from "react";
import Editor from "../Editor/Editor";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Button } from "@material-ui/core";
import "./answerBox.css";

const useStyles = makeStyles({
  container: {
    boxShadow: "0 2px 15px rgb(0 0 0 / 22%)",
    padding: "20px",
    backgroundColor: "#fff",
    width: "1100px",
  },
  buttonMain: {
    marginTop: "10px",
    float: "right",
  },
});

export default function AnswerBox() {
  const [detailAnswer, setDetailAnswer] = useState();
  function handleDetailAnswer(v) {
    setDetailAnswer(v);
  }

  const handleClick = () => {
    console.log(detailAnswer);
    // call api
  };

  const classes = useStyles();

  return (
    <div className={`${classes.container} answer`}>
      <Editor value={detailAnswer || ""} onChange={handleDetailAnswer} />
      <Button
        className={classes.buttonMain}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Đăng
      </Button>
    </div>
  );
}
