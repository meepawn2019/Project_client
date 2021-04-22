import { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AnswerBox from "../../components/AnswerBox/AnswerBox";
const useStyles = makeStyles((theme) => ({
  home: {
    backgroundColor: "rgb(243, 243, 240)",
    paddingTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down(500)]: {
      paddingTop: "90px",
    },
  },
}));

export default function Home() {
  const classes = useStyles();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    axios
      .get("/getQuestions")
      .then((val) => {
        setQuestions(val.data.questions);
        setLoading(false);
      }, [])
      .catch((e) => {
        setLoading(false);
        setError(true);
        setErrorText(e);
      });
  }, []);
  return (
    <div className={classes.home}>
      {!loading ? (
        error ? (
          <div>{errorText.message}</div>
        ) : questions.length > 0 ? (
          questions.map((question, index) => (
            <QuestionCard key={index} question={question} />
          ))
        ) : (
          <div>Khong co gi</div>
        )
      ) : (
        <CircularProgress />
      )}
      <AnswerBox />
    </div>
  );
}
