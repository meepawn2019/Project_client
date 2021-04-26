import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import StatsCard from "../../../components/StatsCard/StatsCard";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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
export default function Statistics(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <StatsCard
            number={fakeData.newUser}
            unit={"Người dùng mới"}
            type={"user"}
          />
        </Grid>
        <Grid item xs={4}>
          <StatsCard
            number={fakeData.newQuestion}
            unit={"Câu hỏi mới"}
            type={"question"}
          />
        </Grid>
        <Grid item xs={4}>
          <StatsCard
            number={fakeData.newAnswer}
            unit={"Câu trả lời mới"}
            type={"question"}
          />
        </Grid>
        <Grid item xs={4}>
          <StatsCard
            number={fakeData.bannedUser}
            unit={"Người dùng bị ban"}
            type={"user"}
          />
        </Grid>
        <Grid item xs={4}>
          <StatsCard
            number={fakeData.deletedQuestion}
            unit={"Câu hỏi bị xóa"}
            type={"question"}
          />
        </Grid>
        <Grid item xs={4}>
          <StatsCard
            number={fakeData.deletedAnswer}
            unit={"Câu trả lời bị xóa"}
          />
        </Grid>
        <Grid item xs={4}>
          <StatsCard
            number={fakeData.currentUser}
            unit={"Người dùng"}
            type={"user"}
          />
        </Grid>
        <Grid item xs={4}>
          <StatsCard number={fakeData.currentQuestion} unit={"Câu hỏi"} />
        </Grid>
        <Grid item xs={4}>
          <StatsCard number={fakeData.currentAnswer} unit={"Câu trả lời"} />
        </Grid>
      </Grid>
    </div>
  );
}
