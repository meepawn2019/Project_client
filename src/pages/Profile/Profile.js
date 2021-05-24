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

import ShareIcon from "@material-ui/icons/Share";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import MoreVert from "@material-ui/icons/MoreVert";

import SimpleTabs from "./ProfileTab";
import Questions from "./Questions";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core";
import NavBar from "../../components/NavBar/NavBar";

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
  coverPhoto: {
    width: "90vw",
    height: "50vw",
    position: "relative",
    backgroundColor: "white",
    [theme.breakpoints.up(700)]: {
      width: "630px",
      height: "350px",
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const classes = useStyles();
  const { id } = useParams();
  const tab = useQuery().get("tab");
  useEffect(() => {
    axios
      .get(`/profile/${id}`)
      .then((data) => {
        setUser(data.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  }, [id]);

  return (
    <div className={classes.root}>
      <NavBar />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div>error</div>
      ) : (
        <div className={classes.root}>
          <div className={classes.coverPhoto}>
            <img
              // src="/wp7053694.png"
              src={user.coverImage}
              style={{ width: "inherit", height: "inherit" }}
              alt="cover"
            ></img>
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              // src="https://cdn.dribbble.com/users/29574/screenshots/4882066/avatar_-_spider-man_-_dribbble.png?compress=1&resize=400x300"
              src={user.avatar}
            />
          </div>

          <Typography className={classes.userName} align="center">
            {user.userName || "Null"}
          </Typography>

          <SimpleTabs initTab={tab} />
          <Temp
            question={user.question.questions}
            comment={user.comment}
            topic={user.topic}
            friend={user.friend}
          />
        </div>
      )}
    </div>
  );
}

function Answer({ name }) {
  return <div>{name}</div>;
}

const Temp = (props) => {
  const tab = useQuery().get("tab");
  switch (tab) {
    case "questions":
      return <Questions question={props.question} />;
    case "topics":
      return <div></div>;
    case "friends":
      return props.friend.map((friend) => <Answer name={friend} />);

    default:
      return (
        <div style={{ marginTop: 20 }}>
          {props.comment.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      );
  }
};

const Comment = (props) => {
  const comment = props.comment;
  const classes = useStyles();
  const user = comment.owner.userName || "Huy";
  const date =
    new Date(comment.commentAt).toLocaleDateString() || "September 14, 2016";
  console.log(comment.question);
  return (
    <Card className={classes.comment}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            // className={classes.avatar}
            src="https://cdn.dribbble.com/users/29574/screenshots/4882066/avatar_-_spider-man_-_dribbble.png?compress=1&resize=400x300"
          />
        }
        title={user}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <Button component={Link} to={`/question/${comment.question.id}`}>
            <Box className={classes.question} fontWeight="fontWeightBold">
              {"See full question : " + comment.question.question}
            </Box>
          </Button>
        </Typography>
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
    </Card>
  );
};
