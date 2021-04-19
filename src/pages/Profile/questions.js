import { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  home: {
    marginTop: "20px",
  },
}));

export default function Questions(props) {
  const classes = useStyles();
  const userId = props.userId;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId) {
      axios
        .get("/getQuestions")
        .then((val) => {
          setQuestions(val.data.questions);
          setLoading(false);
        }, [])
        .catch((e) => setError(true));
    } else {
      axios
        .get(`/getQuestionsByUserId/${userId}`)
        .then((val) => {
          setQuestions(val.data.questions);
          setLoading(false);
        }, [])
        .catch((e) => {
          setError(true);
        });
    }
  }, [userId]);
  return (
    <div className={classes.home}>
      {!loading ? (
        error ? (
          <div>Error</div>
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
    </div>
  );
}
