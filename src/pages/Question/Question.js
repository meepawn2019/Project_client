import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
//com
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
//icon
import ShareIcon from "@material-ui/icons/Share";
import MoreVert from "@material-ui/icons/MoreVert";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import axios from "axios";
import CommentInput from "../../components/CommentInput";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
var comment1 = {
  user: "Huy",
  commentAt: new Date().toISOString(),
  detail: `Thing's just ok`,
  like: [],
  dislike: [],
};

var comments1 = Array(10).fill(comment1);
export default function Question() {
  let { id } = useParams();
  const classes = useStyles();
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`getQuestion/${id}`)
      .then((data) => {
        setQuestion(data.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  }, []);
  console.log(question);
  //   return <div></div>;
  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>error</div>
  ) : (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src="https://cdn.dribbble.com/users/29574/screenshots/4882066/avatar_-_spider-man_-_dribbble.png?compress=1&resize=400x300"
            />
          }
          title={question.owner}
          subheader={question.createAt}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <Box className={classes.question} fontWeight="fontWeightBold">
              {question.question}
            </Box>
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <Tooltip title="Up Vote">
            <IconButton aria-label="like">
              <Badge badgeContent={question.like.length || 0} color="secondary">
                <ThumbUp />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Down Vote">
            <IconButton aria-label="dislike">
              <Badge
                badgeContent={question.dislike.length || 0}
                color="secondary"
              >
                <ThumbDown />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Trả lời">
            <IconButton aria-label="Comment">
              <Badge
                badgeContent={question.commentCount || 0}
                color="secondary"
              >
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
      </Card>
      <CommentInput />
      <div>
        {comments1.length <= 0 ? (
          <div>No answer yet</div>
        ) : (
          comments1.map((com, index) => {
            com.user = com.user + index;
            return <Comment key={index} comment={com} />;
          })
        )}
      </div>
    </div>
  );
}

const Comment = (props) => {
  const comment = props.comment;
  const classes = useStyles();
  const user = comment.user || "Huy";
  const date = comment.commentAt || "September 14, 2016";
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
        title={user}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <Box className={classes.question} fontWeight="fontWeightBold">
            {comment.detail}
          </Box>
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Tooltip title="Up Vote">
          <IconButton aria-label="like">
            <ThumbUp />
          </IconButton>
        </Tooltip>
        <Tooltip title="Down Vote">
          <IconButton aria-label="dislike">
            <ThumbDown />
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
