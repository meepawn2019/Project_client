<<<<<<< HEAD
export default function CommentCart(props){
    let comment = props.comment;

    return(
        
    )
}
=======
import React, { useState } from "react";
import Editor from "./Editor/Editor";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Button } from "@material-ui/core";
import "./answerCard.css";

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

export default function AnswerCard() {
  const [detailAnswer, setDetailAnswer] = useState();
  function handleDetailAnswer(v) {
    setDetailAnswer(v);
  }

  const classes = useStyles();

  return (
    <div className={`${classes.container} answer`}>
      <Editor value={detailAnswer || ""} onChange={handleDetailAnswer} />
      <Button
        className={classes.buttonMain}
        variant="contained"
        color="primary"
      >
        Đăng
      </Button>
    </div>
  );
}
>>>>>>> 9e966d601b05dc5db632871432932c5c799f27e4
