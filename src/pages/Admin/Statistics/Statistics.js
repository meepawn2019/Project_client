import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StatsCard from "../../../components/StatsCard/StatsCard";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useQuery, gql, useMutation } from "@apollo/client";
import LoadingDialog from "../../../components/Modal/LoadingDialog";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      width: "calc(100% - 260px)",
      marginLeft: 240,
    },
    width: "500px",
    bottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "auto",
    marginTop: "70px",
    borderRadius: "20px",
  },
  button: {
    margin: "12px",
  },
  selected: {
    backgroundColor: "#3f51b5",
    color: "white",
    "&:hover": {
      color: "#3f51b5",
    },
  },
}));

const fakeData = {
  currentUser: 200,
  currentQuestion: 320,
  currentAnswer: 400,
  newUser: 120,
  newQuestion: 100,
  newAnswer: 300,
  bannedUser: 10,
  deletedQuestion: 20,
  deletedAnswer: 20,
};

const AppQuery = gql`
  query {
    user {
      createAt
      banStatus
    }
  }
`;

const QUESTION_QUERY = gql`
  query {
    question {
      createAt
    }
  }
`;

const ANSWER_QUERY = gql`
  query {
    comments {
      createAt
    }
  }
`;

const timeOptions = ["Day", "Month"];

export default function Statistics(props) {
  const { loading, error, data, refetch } = useQuery(AppQuery);
  const {
    loading: questionLoading,
    data: questionData,
    refetch: refecthQuestion,
  } = useQuery(QUESTION_QUERY);
  const {
    loading: answerLoading,
    data: answerData,
    refetch: refecthAnswer,
  } = useQuery(ANSWER_QUERY);
  const [users, setUsers] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [bannedUsers, setBannedUsers] = useState(0);
  const [newQuestions, setNewQuestions] = useState(0);
  const [questions, setQuestions] = useState(0);
  const [answers, setAnswers] = useState(0);
  const [newAnswers, setNewAnswers] = useState(0);
  const [timeRange, setTimeRange] = useState("Day");

  const classes = useStyles();

  useEffect(() => {
    if (!loading && !questionLoading && !answerLoading) {
      console.log(data.user.length);
      console.log(answerData.comments.length);
      console.log(questionData.question.length);

      setUsers(data.user.length);
      setNewUsers(
        data.user.filter(
          (el) =>
            new Date(el.createAt).toJSON().slice(0, 10).replace(/-/g, "/") ===
            new Date().toJSON().slice(0, 10).replace(/-/g, "/")
        ).length
      );
      setBannedUsers(data.user.filter((el) => el.banStatus).length);
      setQuestions(questionData.question.length);
      setAnswers(answerData.comments.length);
      setNewAnswers(
        answerData.comments.filter(
          (el) =>
            new Date(el.createAt).toJSON().slice(0, 10).replace(/-/g, "/") ===
            new Date().toJSON().slice(0, 10).replace(/-/g, "/")
        ).length
      );
      setNewQuestions(
        questionData.question.filter(
          (el) =>
            new Date(el.createAt).toJSON().slice(0, 10).replace(/-/g, "/") ===
            new Date().toJSON().slice(0, 10).replace(/-/g, "/")
        ).length
      );
    }
  }, [loading, questionLoading, answerLoading]);

  const handleDayClick = () => {
    setTimeRange("Day");
    setNewUsers(
      data
        ? data.user.filter(
            (el) =>
              new Date(el.createAt).toJSON().slice(0, 10).replace(/-/g, "/") ===
              new Date().toJSON().slice(0, 10).replace(/-/g, "/")
          ).length
        : 0
    );
    setNewAnswers(
      answerData.comments.filter(
        (el) =>
          new Date(el.createAt).toJSON().slice(0, 10).replace(/-/g, "/") ===
          new Date().toJSON().slice(0, 10).replace(/-/g, "/")
      ).length
    );
    setNewQuestions(
      questionData.question.filter(
        (el) =>
          new Date(el.createAt).toJSON().slice(0, 10).replace(/-/g, "/") ===
          new Date().toJSON().slice(0, 10).replace(/-/g, "/")
      ).length
    );
  };

  const handleMonthClick = () => {
    setTimeRange("Month");
    setNewUsers(
      data
        ? data.user.filter(
            (el) => new Date(el.createAt).getMonth() === new Date().getMonth()
          ).length
        : 0
    );
    setNewAnswers(
      answerData
        ? answerData.comments.filter(
            (el) => new Date(el.createAt).getMonth() === new Date().getMonth()
          ).length
        : 0
    );
    setNewQuestions(
      questionData
        ? questionData.question.filter(
            (el) => new Date(el.createAt).getMonth() === new Date().getMonth()
          ).length
        : 0
    );
  };

  if (loading || questionLoading || answerLoading) {
    return <LoadingDialog show={loading} type={"loading"} />;
  }
  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            className={`${classes.button} ${
              timeRange === "Day" && classes.selected
            }`}
            onClick={handleDayClick}
          >
            Day
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={`${classes.button} ${
              timeRange === "Month" && classes.selected
            }`}
            onClick={handleMonthClick}
          >
            Month
          </Button>
        </Grid>
        <Grid item xs={4}>
          <StatsCard number={newUsers} unit={"Người dùng mới"} type={"user"} />
        </Grid>
        <Grid item xs={4}>
          <StatsCard
            number={newQuestions}
            unit={"Câu hỏi mới"}
            type={"question"}
          />
        </Grid>
        <Grid item xs={4}>
          <StatsCard
            number={newAnswers}
            unit={"Câu trả lời mới"}
            type={"question"}
          />
        </Grid>
        <Grid item xs={4}>
          <StatsCard
            number={bannedUsers}
            unit={"Người dùng bị ban"}
            type={"user"}
          />
        </Grid>
        <Grid item xs={4}>
          <StatsCard number={users} unit={"Người dùng"} type={"user"} />
        </Grid>
        <Grid item xs={4}>
          <StatsCard number={questions} unit={"Câu hỏi"} />
        </Grid>
        <Grid item xs={4}>
          <StatsCard number={answers} unit={"Câu trả lời"} />
        </Grid>
      </Grid>
    </div>
  );
}
