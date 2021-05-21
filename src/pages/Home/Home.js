import { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { connect } from "react-redux";
import { loadHomeQuestion } from "../../redux/action/homeQuestionAction";
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

// const trigger = (bound) => {
//   const a = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: bound,
//   });
//   return a;
// };

function Home(props) {
  const classes = useStyles();
  const homeQuestion = props.homeQuestion;
  const loadHomeQuestion = props.loadHomeQuestion;
  const questions = homeQuestion.question;

  let finished = Boolean(homeQuestion.finished);
  let isLast = Boolean(homeQuestion.isLast);

  let loadingNew = false;
  let loadAfter = homeQuestion.total || 20;

  const [loading, setLoading] = useState(Boolean(finished));
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const scrollListener = (event) => {
    const rect = document.body.getBoundingClientRect().bottom;
    console.log(loadAfter);
    if (rect < 2000 && !loadingNew && !isLast) {
      loadingNew = true;
      axios
        .get(`/getQuestions/${loadAfter}`)
        .then((data) => {
          let content = data.data.questions;
          isLast = data.data.isLast;
          loadAfter = data.data.total;
          loadHomeQuestion({
            question: content,
            total: data.data.total,
            isLast: isLast,
          });

          loadingNew = false;
        })
        .catch((e) => {
          setError(true);
          setErrorText(e.message);
        });
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    if (!finished) {
      setLoading(true);
      axios
        .get("/getQuestions")
        .then((val) => {
          let content = val.data.questions;
          loadHomeQuestion({
            question: content,
            total: val.data.total,
            isLast: val.data.isLast,
          });
          setLoading(false);
        }, [])
        .catch((e) => {
          setLoading(false);
          setError(true);
          setErrorText(e);
        });
    } else {
      setLoading(false);
    }

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);
  return (
    <div className={classes.home}>
      {!loading ? (
        error ? (
          <div>{errorText.message}</div>
        ) : (
          props.homeQuestion.question.map((question, index) => (
            <QuestionCard key={index} question={question} />
          ))
        )
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  homeQuestion: state.homeQuestion,
});
const mapDispatchToProps = {
  loadHomeQuestion,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
