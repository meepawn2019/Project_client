import { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
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

  useEffect(() => {
    axios
      .get("/getQuestions")
      .then((val) => {
        setQuestions(val.data.questions);
        setLoading(false);
      }, [])
      .catch((e) => []);
  }, []);
  return (
    <div className={classes.home}>
      {!loading ? (
        questions.length > 0 ? (
          questions.map((question, index) => (
            <QuestionCard key={index} question={question} />
          ))
        ) : (
          <div>Khong co gi</div>
        )
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
