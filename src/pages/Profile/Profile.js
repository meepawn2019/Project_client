import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import SnackBar from "@material-ui/core/SnackBar";
import Alert from "@material-ui/lab/Alert";

import SimpleTabs from "./ProfileTab";
import Questions from "./Questions";
import PersonalInfo from "./PersonalInfo";
import ImageCrop from "../../components/ImageCrop";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  loadAnUser,
  loadAnUserAnswer,
  loadAnUserQuestion,
  changeUserAvatar,
  changeUserCoverImage,
} from "../../redux/action/userInfoAction";

import {
  changeCurrentUserAvatar,
  changeCurrentUserCoverImage,
} from "../../redux/action/currentUserAction";

import AnswerCard from "../../components/AnswerCard";
import { connect } from "react-redux";
import { Dialog } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgb(243, 243, 240)",
    paddingTop: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    marginBottom: 15,
  },
  comment: {
    width: "90vw",
    borderRadius: 20,
    marginBottom: 15,
    [theme.breakpoints.up(900)]: {
      width: 810,
    },
  },
  coverPhoto: {
    width: "90vw",
    height: "50vw",
    position: "relative",
    backgroundColor: "white",
    [theme.breakpoints.up(900)]: {
      width: 810,
      height: 450,
    },
  },
  avatar: {
    width: "140px",
    height: "140px",
    position: "absolute",
    bottom: "-10px",
    left: "50%",
    marginLeft: "-70px",
    backgroundColor: "white",
  },
  imageLoadButton: {
    cursor: "pointer",
  },
  userName: {
    margin: "10px",
    fontSize: "20px",
    fontWeight: "bold",
  },

  temp: {
    marginTop: "20px",
    flexGrow: 1,
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Profile(props) {
  const classes = useStyles();
  const { id } = useParams();
  let tab = useQuery().get("tab");
  const user = props.user[id]?.user;
  const answer = props.user[id]?.answer;
  const question = props.user[id]?.question;
  const currentUser = props.currentUser.user;
  const isOwner = currentUser?._id === id;
  console.log(user?.coverImage||'hihihi');
  const {
    loadAnUser,
    loadAnUserAnswer,
    loadAnUserQuestion,
    changeUserAvatar,
    changeUserCoverImage,
  } = props;

  const [loadingUser, setLoadingUser] = useState(!Boolean(user));
  // const [loadingAnswer, setLoadingAnswer] = useState(false);
  // const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [error, setError] = useState(false);

  const [openCrop, setOpenCrop] = useState(false);
  const [aspect, setAspect] = useState(1);
  const [apiUrl, setApiUrl] = useState();

  const [file, setFile] = useState();

  const [snackBar, setSnackBar] = useState(false);
  const [snackBarType, setSnackBarType] = useState("warning");
  const [snackBarText, setSnackBarText] = useState("");

  let isQuestionLoading = false;
  let isAnswerLoading = false;
  let loadQuestionAfter = question?.total || 20;
  let loadAnswerAfer = answer?.total || 20;
  let isLastQuestion = question?.isLast;
  let isLastAnswer = answer?.isLast;

  const loadMoreQuestion = (skip) => {
    axios
      .get(`/getQuestionsByUserId/${id}/${skip}`)
      .then((data) => {
        loadAnUserQuestion({
          id: id,
          content: data.data.question,
          isLast: data.data.isLast,
          total: data.data.total,
        });
        loadQuestionAfter = data.data.total;
        isLastQuestion = data.data.isLast;
        isQuestionLoading = false;
      })
      .catch((e) => {
        // setLoadingQuestion(false);
        // setError(true);
      });
  };

  const loadMoreAnswer = (skip) => {
    axios
      .get(`/getCommentsOfUser/${id}/${skip}`)
      .then((data) => {
        loadAnUserAnswer({
          id: id,
          content: data.data.comment,
          isLast: data.data.isLast,
          total: data.data.total,
        });
        loadAnswerAfer = data.data.total;
        isLastAnswer = data.data.isLast;
        isAnswerLoading = false;
      })
      .catch((e) => {
        // setLoadingAnswer(false);
        // setError(true);
      });
  };
  const scrollListener = (event) => {
    const rect = document.body.getBoundingClientRect().bottom;
    if (tab === "questions") {
      if (rect < 2000 && !isQuestionLoading && !isLastQuestion) {
        isQuestionLoading = true;

        loadMoreQuestion(loadQuestionAfter);
      }
    } else {
      if (rect < 2000 && !isAnswerLoading && !isLastAnswer) {
        isAnswerLoading = true;
        loadMoreAnswer(loadAnswerAfer);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    if (!user) {
      setLoadingUser(true);
      axios
        .get(`/profile/${id}`)
        .then((data) => {
          loadAnUser(data.data);
          setLoadingUser(false);
        })
        .catch((e) => {
          setLoadingUser(false);
          setError(true);
        });
    }
    if (!answer && !tab) {
      loadMoreAnswer(0);
    }

    if (!question && tab) {
      loadMoreQuestion(0);
    }
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [id, tab]);

  const onAvatarChoose = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setAspect(1);
      setApiUrl("/updateAvatar");
      setOpenCrop(true);
    }
  };
  const onCoverImageChoose = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setAspect(9 / 5);
      setApiUrl("/updateCoverImage");
      setOpenCrop(true);
    }
  };

  const getNewUrl = (data) => {
    setOpenCrop(false);
    setSnackBar(true);
    setSnackBarType("success");
    setSnackBarText("Thay đổi thành công");
    if (apiUrl.includes("updateAvatar")) {
      changeUserAvatar({ id: id, content: data.data.avatar });
      changeCurrentUserAvatar({ content: data.data.avatar });
    } else if (apiUrl.includes("updateCoverImage")) {
      changeUserCoverImage({ id: id, content: data.data.coverImage });
      changeCurrentUserCoverImage({ content: data.data.coverImage });
    }
  };

  const getError = (e) => {
    setSnackBar(true);
    setSnackBarType("warning");
    setSnackBarText(e?.response?.data || "Lỗi");
  };

  const onCloseCrop = () => {
    setFile(null);
    setOpenCrop(false);
  };

  return loadingUser ? (
    <CircularProgress />
  ) : error ? (
    <div>error</div>
  ) : (
    <div className={classes.root}>
      {
        
        <div>
          <SnackBar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={snackBar}
            autoHideDuration={3000}
            onClose={() => setSnackBar(false)}
            message="Note archived"
          >
            <Alert onClose={() => setSnackBar(false)} severity={snackBarType}>
              {snackBarText}
            </Alert>
          </SnackBar>
          {file && (
            <Dialog open={openCrop} onClose={onCloseCrop}>
              <ImageCrop
                open={openCrop}
                setOpen={setOpenCrop}
                onClose={onCloseCrop}
                aspect={aspect}
                apiUrl={apiUrl}
                getNewUrl={getNewUrl}
                getError={getError}
                file={file}
              />
            </Dialog>
          )}
          <div className={classes.coverPhoto}>
            <label
              className={`${classes.coverPhoto} ${
                isOwner && classes.imageLoadButton
              }`}
            >
              <img
                src={
                  user.coverImage || "../no-cover.png"
                }
                style={{ width: "inherit", height: "inherit" }}
                alt="cover"
              ></img>
              {isOwner && (
                <input type="file" hidden onChange={onCoverImageChoose} />
              )}
            </label>

            <label>
              <Avatar
                aria-label="recipe"
                className={`${classes.avatar} ${
                  isOwner && classes.imageLoadButton
                }`}
                src={user?.avatar || "../customer_avatar.png"}
              />
              {isOwner && (
                <input type="file" hidden onChange={onAvatarChoose} />
              )}
            </label>
          </div>

          <Typography className={classes.userName} align="center">
            {user?.userName || "Null"}
          </Typography>

          <SimpleTabs initTab={tab} />

          <div className={classes.temp}>
            <Info
              className={classes.comment}
              // user={props.user[id]?.user}
              user={user}
              currentUser={currentUser}
              question={question?.content || []}
              answer={answer?.content || []}
              loadingAnswer={!Boolean(answer)}
              loadingQuestion={!Boolean(question)}
              loadingUser={loadingUser}
            />
          </div>
        </div>
      }
    </div>
  );
}

const Temp = (props) => {
  const {
    user,
    currentUser,
    question,
    answer,
    loadingAnswer,
    loadingQuestion,
    loadingUser,
  } = props;
  let userInfo = user;
  const tab = useQuery().get("tab");
  switch (tab) {
    case "questions":
      return !loadingQuestion ? (
        <Questions
          question={question.map((q) => {
            q.owner = userInfo;
            return q;
          })}
        />
      ) : (
        <CircularProgress />
      );
    case "info":
      return !loadingUser ? <PersonalInfo user={user} /> : <CircularProgress />;

    default:
      return loadingAnswer ? (
        <CircularProgress />
      ) : (
        answer.map((ans, index) => {
          ans.owner = userInfo;
          return (
            <AnswerCard key={index} comment={ans} currentUser={currentUser} />
          );
        })
      );
  }
};

const mapStateToProps = (state) => ({
  user: state.userInfo,
  currentUser: state.currentUser,
});

const mapDispatchToProps = {
  loadAnUser,
  loadAnUserAnswer,
  loadAnUserQuestion,
  changeUserAvatar,
  changeUserCoverImage,

  changeCurrentUserAvatar,
  changeCurrentUserCoverImage,
};

const Info = connect(null, mapDispatchToProps)(Temp);
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
