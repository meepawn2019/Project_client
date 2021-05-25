import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ReactHtmlParser from "react-html-parser";
//com
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Badge from "@material-ui/core/Badge";
import MUILink from "@material-ui/core/Link";
// import Divider from "@material-ui/core/Divider";
//icon
import ShareIcon from "@material-ui/icons/Share";
import MoreVert from "@material-ui/icons/MoreVert";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import axios from "axios";

import {
  likeAnAnswer,
  dislikeAnAnswer,
  deleteAnAnswer,
} from "../redux/action/answerInQuestionAction";
import { connect } from "react-redux";
import { useState } from "react";

import { deleteAnUserAnswer } from "../redux/action/userInfoAction";
import { from } from "form-data";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 100,
    // justifyContent: "center",
  },
  card: {
    width: "90vw",
    marginBottom: 15,
    marginTop: 100,
    [theme.breakpoints.up(900)]: {
      width: 810,
    },
  },

  avatar: {
    backgroundColor: red[500],
  },
  question: {
    fontSize: "5vw",
    fontWeight: "fontWeightBold",
    color: "black",
    [theme.breakpoints.up("500")]: {
      fontSize: 25,
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
}));

function AnswerInQuestionCard(props) {
  const comment = props.comment;
  const questionId = props.questionId;
  const currentUser = props.currentUser;

  const { likeAnAnswer, dislikeAnAnswer, deleteAnAnswer, deleteAnUserAnswer } =
    props;

  const token = localStorage.getItem("token");

  const classes = useStyles();

  const user = comment?.owner?.userName || "Huy";
  const date =
    new Date(comment.createAt).toLocaleDateString() +
    " " +
    new Date(comment.createAt).toLocaleTimeString();

  function like() {
    console.log(comment._id);

    axios
      .get(`/like/${comment._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(console.log)
      .catch(console.log);
    likeAnAnswer({
      id: questionId,
      content: {
        answerId: comment._id,
        userId: currentUser._id,
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
      .then(console.log)
      .catch(console.log);
    dislikeAnAnswer({
      id: questionId,
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
        deleteAnAnswer({ id: questionId, answerId: comment._id });
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

      {/* <MenuItem onClick={handleClose}>Sửa câu trả lời</MenuItem> */}
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
              className={classes.avatar}
              src={comment.owner.avatar}
            />
          </MUILink>
        }
        title={
          <MUILink component={Link} to={`/profile/${comment.owner._id}`}>
            {user}
          </MUILink>
        }
        subheader={date}
      />
      <CardContent>
        <Box className={classes.question}>
          {ReactHtmlParser(comment.answer)}
        </Box>
      </CardContent>

      <CardActions>
        <Tooltip title="Up Vote">
          <IconButton aria-label="like" onClick={like}>
            <Badge
              max={100000}
              badgeContent={comment.likeCount || 0}
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
            <Badge
              max={100000}
              badgeContent={comment.dislike.length}
              color="secondary"
            >
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

const mapDispatchToProps = {
  likeAnAnswer,
  dislikeAnAnswer,
  deleteAnAnswer,
  deleteAnUserAnswer,
};

export default connect(null, mapDispatchToProps)(AnswerInQuestionCard);
