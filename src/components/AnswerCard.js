import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { makeStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import CardActions from "@material-ui/core/CardActions";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MUILink from "@material-ui/core/Link";

import ShareIcon from "@material-ui/icons/Share";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import MoreVert from "@material-ui/icons/MoreVert";

import axios from "axios";
import { connect } from "react-redux";

import {
  likeAnAnswer,
  dislikeAnAnswer,
  deleteAnAnswer,
} from "../redux/action/answerInQuestionAction";

import {
  likeAnUserAnswer,
  dislikeAnUserAnswer,
  deleteAnUserAnswer,
} from "../redux/action/userInfoAction";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgb(243, 243, 240)",
    paddingTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 15,
    [theme.breakpoints.down(500)]: {
      marginTop: "90px",
    },
  },
  comment: {
    width: "90vw",
    borderRadius: 20,
    marginBottom: 15,
    [theme.breakpoints.up(900)]: {
      width: 810,
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
  userName: {
    margin: "10px",
    fontSize: "20px",
    fontWeight: "bold",
  },
}));

function AnswerCard(props) {
  const comment = props.comment;
  const currentUser = props.currentUser;
  let key = props.keyNow;
  const classes = useStyles();
  const user = comment.owner;
  const date = new Date(comment.createAt);
  const token = localStorage.getItem("token");

  const {
    likeAnAnswer,
    likeAnUserAnswer,
    dislikeAnAnswer,
    dislikeAnUserAnswer,
    deleteAnAnswer,
    deleteAnUserAnswer,
  } = props;

  function like() {
    axios
      .get(`/like/${comment._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(console.log)
      .catch(console.log);
    likeAnAnswer({
      id: comment.question._id,
      content: {
        answerId: comment._id,
        userId: currentUser._id,
      },
    });
    likeAnUserAnswer({
      id: comment.owner._id,
      content: {
        userId: currentUser._id,
        answerId: comment._id,
      },
    });
  }
  function dislike() {
    console.log(comment._id);
    axios
      .get(`/dislike/${comment._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then()
      .catch(console.log);
    dislikeAnAnswer({
      id: comment.question._id,
      content: {
        answerId: comment._id,
        userId: currentUser._id,
      },
    });
    dislikeAnUserAnswer({
      id: comment.owner._id,
      content: {
        answerId: comment._id,
        userId: currentUser._id,
      },
    });
  }
  const deleteAnswer = () => {
    axios
      .delete(`/deleteComment/${comment._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        handleClose();
        deleteAnAnswer({ id: comment.question._id, answerId: comment._id });
        deleteAnUserAnswer({ id: currentUser._id, content: comment._id });
      });
  };

  const reportAnswer = () => {
    axios
      .post(
        "/report?type=Comment",
        {
          reported: comment._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      // .then(() => console.log("ok"))
      .catch((e) => console.log(e.response));
    handleClose();
  };

  const [menuOpen, setMenuOpen] = useState(null);

  const onClick = (event) => {
    setMenuOpen(event.currentTarget);
  };

  const handleClose = () => {
    setMenuOpen(null);
  };

  const ownerMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menuOpen}
      keepMounted
      open={Boolean(menuOpen)}
      onClose={handleClose}
    >
      <MenuItem onClick={deleteAnswer}>Xóa câu trả lời</MenuItem>

      <MenuItem onClick={handleClose}>Sửa câu trả lời</MenuItem>
    </Menu>
  );

  const notOwnerMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menuOpen}
      keepMounted
      open={Boolean(menuOpen)}
      onClose={handleClose}
    >
      <MenuItem onClick={reportAnswer}>Báo cáo</MenuItem>
    </Menu>
  );

  return (
    <Card className={classes.comment}>
      {currentUser._id === comment.owner._id ? ownerMenu : notOwnerMenu}
      <CardHeader
        avatar={
          <MUILink component={Link} to={`/profile/${comment.owner._id}`}>
            <Avatar
              aria-label="recipe"
              key={key}
              src={
                user.avatar ||
                "https://cdn.dribbble.com/users/29574/screenshots/4882066/avatar_-_spider-man_-_dribbble.png?compress=1&resize=400x300"
              }
            />
          </MUILink>
        }
        title={
          <MUILink component={Link} to={`/profile/${comment.owner._id}`}>
            {user.userName}
          </MUILink>
        }
        subheader={date.toLocaleDateString() + " " + date.toLocaleTimeString()}
      />
      <CardContent>
        <Button component={Link} to={`/question/${comment.question._id}`}>
          <Box fontWeight="fontWeightBold">
            {"Xem toàn bộ câu hỏi : " + comment.question.question}
          </Box>
        </Button>

        <Box>{ReactHtmlParser(comment.answer)}</Box>
      </CardContent>

      <CardActions disableSpacing>
        <Tooltip title="Up Vote">
          <IconButton aria-label="like" onClick={like}>
            <Badge
              max={100000}
              badgeContent={comment.likeCount}
              color="secondary"
            >
              <ThumbUp
                color={
                  comment.like?.includes(currentUser._id)
                    ? "secondary"
                    : "action"
                }
              />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Down Vote">
          <IconButton aria-label="dislike" onClick={dislike}>
            <Badge badgeContent={comment.dislike.length} color="secondary">
              <ThumbDown
                color={
                  comment.dislike?.includes(currentUser._id)
                    ? "secondary"
                    : "action"
                }
              />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* <Tooltip title="Share">
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Tooltip> */}
        <Tooltip title="More">
          <IconButton aria-label="more" onClick={onClick}>
            <MoreVert />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user,
    user: state.userInfo,
  };
};
const mapDispatchToProps = {
  likeAnAnswer,
  dislikeAnAnswer,
  deleteAnAnswer,
  deleteAnUserAnswer,
  likeAnUserAnswer,
  dislikeAnUserAnswer,
};

export default connect(null, mapDispatchToProps)(AnswerCard);
