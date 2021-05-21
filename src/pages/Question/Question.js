import { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
//com
import Typography from "@material-ui/core/Typography";

// import Divider from "@material-ui/core/Divider";
//icon
import axios from "axios";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import AnswerInQuestionCard from "../../components/AnswerInQuestionCard";
import Button from "@material-ui/core/Button";
import AnswerBox from "../../components/AnswerBox/AnswerBox";
import { connect } from "react-redux";

import {
  loadQuestion,
  loadAnswerInQuestion,
} from "../../redux/action/answerInQuestionAction";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 100,
    // justifyContent: "center",
  },
  partTitle: {
    fontSize: 30,
    fontWeight: "bold",
    // margin
  },
  button: {
    position: "fixed",
    bottom: 15,
    right: 15,
    backgroundColor: "orange",
    height: 50,
    borderRadius: 30,
    padding: 10,
    margin: 10,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    "&:hover": {
      backgroundColor: "#ff6600",
    },
  },
}));

function Question(props) {
  let { id } = useParams();
  const classes = useStyles();

  const currentUser = props.currentUser.user;
  const answerInQuestion = props.answerInQuestion[id];
  const { loadQuestion, loadAnswerInQuestion } = props;
  let loadingNew = false;
  let loadAfter = answerInQuestion?.total || 20;
  const [loadingQuestion, setLoadingQuestion] = useState(
    !Boolean(answerInQuestion?.question)
  );

  const [loadingComment, setLoadingComment] = useState(
    !Boolean(answerInQuestion?.answer)
  );

  const [error, setError] = useState(false);
  const [answerBoxShow, setAnswerBoxShow] = useState(false);

  const scrollListener = (event) => {
    const rect = document.body.getBoundingClientRect().bottom;
    if (rect < 2000 && !loadingNew && !answerInQuestion?.isLast) {
      loadingNew = true;
      axios
        .get(`/getCommentsInQuestion/${id}/${loadAfter}`)
        .then((data) => {
          let answers = data.data;
          loadAfter += answers.comment.length;
          loadAnswerInQuestion({
            id: id,
            content: answers.comment,
            total: answers.total,
            isLast: answers.isLast,
          });
          setLoadingComment(false);
          loadingNew = false;
        })
        .catch((e) => {
          setError(true);
        });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    if (!answerInQuestion?.question) {
      axios
        .get(`getQuestion/${id}`)
        .then((data) => {
          let question = data.data;

          loadQuestion(question);

          setLoadingQuestion(false);
        })
        .catch((e) => {
          setError(true);

          props.history.push("/");
        });
    }
    if (!answerInQuestion?.answer) {
      axios
        .get(`/getCommentsInQuestion/${id}`)
        .then((data) => {
          let answers = data.data;
          loadAnswerInQuestion({
            id: id,
            content: answers.comment,
            total: answers.total,
            isLast: answers.isLast,
          });
          setLoadingComment(false);
        })
        .catch((e) => {
          setError(true);
        });
    }

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [id]);

  const onCloseAnswerBox = () => {
    setAnswerBoxShow(false);
  };
  const onOpenAnswerBox = () => {
    setAnswerBoxShow(true);
  };

  return (
    <div className={classes.root}>
      <AnswerBox
        questionId={id}
        user={currentUser}
        onClose={onCloseAnswerBox}
        open={answerBoxShow}
      />
      <Typography className={classes.partTitle}>Câu hỏi</Typography>
      {loadingQuestion ? (
        <CircularProgress />
      ) : (
        <QuestionCard
          reload={() => {
            props.history.push("/");
          }}
          question={props.answerInQuestion[id]?.question}
        />
      )}
      <Typography className={classes.partTitle}>Câu trả lời</Typography>

      <div>
        {loadingComment ? (
          <CircularProgress />
        ) : props.answerInQuestion[id]?.answer?.length <= 0 ? (
          <div>No answer yet</div>
        ) : (
          props.answerInQuestion[id].answer.map((com, index) => {
            return (
              <AnswerInQuestionCard
                key={index}
                comment={com}
                currentUser={currentUser}
                questionId={id}
              />
            );
          })
        )}
      </div>
      <Button className={classes.button} onClick={onOpenAnswerBox}>
        Viết câu trả lời
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  answerInQuestion: state.answerInQuestion,
  currentUser: state.currentUser,
});

const mapDispatchToProps = {
  loadQuestion,
  loadAnswerInQuestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
