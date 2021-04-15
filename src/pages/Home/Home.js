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

// const temp = Array(10).fill({question:'How are you?', owner:'Huy'});

export default function Home() {
  const classes = useStyles();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
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
=======
  const onShowArticleModal = () => {
    setModalTitle("Viết Bài");
    setModalType("article");
    setShow(true);
  };

  return (
    <div>
      <Header
        onShowModal={handleShow}
        onShowPostQuestionModal={onShowPostQuestionModal}
        onShowLoginModal={onShowLoginModal}
        onShowRegisterModal={onShowRegisterModal}
        onShowArticleModal={onShowArticleModal}
      />
      <ModalBody
        show={show}
        handleClose={handleClose}
        modalType={modalType}
        modalTitle={modalTitle}
      />
>>>>>>> e92137a5c26f9e39b724bb7131ae8903eb156400
    </div>
  );
}
