import React from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
//com
import Card from "@material-ui/core/Card";
import MUILink from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Collapse from "@material-ui/core/Collapse";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
//icon
import ShareIcon from "@material-ui/icons/Share";
import MoreVert from "@material-ui/icons/MoreVert";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90vw",
    borderRadius: 20,
    marginBottom: 15,
    [theme.breakpoints.up(900)]: {
      width: 810,
    },
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
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
    backgroundColor: "rgb(245,245,245)",
  },
}));

export default function QuestionCard(props) {
  const question = props.question;
  const comments = question.comment;
  const classes = useStyles();


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <MUILink component={Link} to={`/profile/${question.owner.id}`}>
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src="https://cdn.dribbble.com/users/29574/screenshots/4882066/avatar_-_spider-man_-_dribbble.png?compress=1"
            />
          </MUILink>
        }
        title={
          <MUILink component={Link} to={`/profile/${question.owner.id}`}>
            <p>{question.owner.userName}</p>
          </MUILink>
        }
        subheader={new Date(question.createAt).toLocaleDateString()}
      />

      <MUILink component={Link} to={`/question/${question.id}`}>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <Box className={classes.question} fontWeight="fontWeightBold">
              {question.question}
            </Box>
          </Typography>
        </CardContent>
      </MUILink>

      <CardActions disableSpacing>
        <Tooltip title="Trả lời">
          <IconButton
            aria-label="Comment"
          >
            <Badge badgeContent={comments.commentCount || 0} color="secondary">
              <ChatBubbleIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Chia sẻ">
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xem thêm">
          <IconButton aria-label="more">
            <MoreVert />
          </IconButton>
        </Tooltip>
      </CardActions>
      <Divider />
    </Card>
  );
}

const Comment = (props) => {
  const comment = props.comment;
  const classes = useStyles();
  let date = new Date(comment.commentAt);
  comment.commentAt = date.toLocaleDateString();
  return (
    <Card className={classes.comment}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src="https://cdn.dribbble.com/users/29574/screenshots/4882066/avatar_-_spider-man_-_dribbble.png?compress=1&resize=400x300"
          />
        }
        title={comment.owner.userName}
        subheader={comment.commentAt}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <Box className={classes.question} fontWeight="fontWeightBold">
            {ReactHtmlParser(comment.detail)}
          </Box>
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Tooltip title="Up Vote">
          <IconButton aria-label="like">
            <Badge badgeContent={comment.like.length} color="secondary">
              <ThumbUp />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Down Vote">
          <IconButton aria-label="dislike">
            <Badge badgeContent={comment.dislike.length} color="secondary">
              <ThumbDown />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Share">
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="More">
          <IconButton aria-label="more">
            <MoreVert />
          </IconButton>
        </Tooltip>
      </CardActions>
      <Divider />
    </Card>
  );
};
