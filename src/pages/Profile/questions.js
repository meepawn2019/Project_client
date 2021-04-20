import QuestionCard from "../../components/QuestionCard/QuestionCard";
import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  home: {
    marginTop: "20px",
  },
}));

export default function Questions(props) {
  const classes = useStyles();
  const questions = props.question;

  return (
    <div className={classes.home}>
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <QuestionCard key={index} question={question} />
        ))
      ) : (
        <div>Khong co gi</div>
      )}
    </div>
  );
}
