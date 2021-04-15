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

const temp = Array(10).fill({ question: "How are you?", owner: "Huy" });
export default function Questions() {
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
        questions.length>0? (questions.map((question, index) => (
          <QuestionCard key={index} question={question} />
        ))): (<div>Khong co gi</div>)
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
