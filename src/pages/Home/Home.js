import { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { connect } from "react-redux";
import {
  loadHomeQuestion,
  clearAllHomeQuestion,
} from "../../redux/action/homeQuestionAction";
import { Link, useLocation } from "react-router-dom";
import { Tab, Tabs } from "@material-ui/core";
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home(props) {
  const classes = useStyles();
  const homeQuestion = props.homeQuestion;
  const loadHomeQuestion = props.loadHomeQuestion;
  const clearAllHomeQuestion = props.clearAllHomeQuestion;
  const questions = homeQuestion.question;
  // const [questions, setQuestions] = useState([]);
  const tab = useQuery().get("sort");
  // let finished = Boolean(homeQuestion.finished);
  let isLast = Boolean(homeQuestion.isLast);

  let loadingNew = false;
  let loadAfter = homeQuestion.total || 20;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const loadNewQuestion = (skip) => {
    loadingNew = true;

    axios
      .get(`/getQuestions/${skip}${tab === "newest" ? "?sort=newest" : ""}`)
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
  };
  const scrollListener = (event) => {
    const rect = document.body.getBoundingClientRect().bottom;
    console.log(loadAfter);
    if (rect < 2000 && !loadingNew && !isLast) {
      loadNewQuestion(loadAfter);
    }
  };
  let value = tab ? 1 : 0;
  useEffect(() => {
    clearAllHomeQuestion();
    window.addEventListener("scroll", scrollListener);

    loadNewQuestion(0);
    // if (!finished) {
    // } else {
    //   setLoading(false);
    // }

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [tab]);

  const onTabChange = () => {
    // clearAllHomeQuestion();
  };
  return (
    <div className={classes.home}>
      <div>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={onTabChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Nhiều trả lời nhất" component={Link} to={"/"} />
          <Tab label="Mới nhất" component={Link} to={"?sort=newest"} />
          <Tab></Tab>
        </Tabs>
      </div>
      <div>
        <br />
      </div>
      {!loading ? (
        error ? (
          <div>{errorText.message}</div>
        ) : (
          questions.map((question, index) => (
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
  clearAllHomeQuestion,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
