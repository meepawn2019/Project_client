import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import SimpleTabs from "./ProfileTab";
import Questions from "./Questions";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  coverPhoto: {
    width: "90vw",
    height: "50vw",
    position: "relative",
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
  const id = useParams().id;
  const tab = useQuery().get("tab");

  useEffect(() => {
    axios
      .get(`/profile/${id}`)
      .then((data) => {
        setLoading(false);
        setUser(data.data);
      })
      .catch((e) => setError(true));
  }, [id]);

  return loading ? (
    <CircularProgress />
  ) : error ? (
    <div>error</div>
  ) : (
    <div className={classes.root}>
      <div className={classes.coverPhoto}>
        <img
          src="/wp7053694.png"
          style={{ width: "inherit", height: "inherit" }}
          alt="cover"
        ></img>
        <Avatar
          aria-label="recipe"
          className={classes.avatar}
          src="https://cdn.dribbble.com/users/29574/screenshots/4882066/avatar_-_spider-man_-_dribbble.png?compress=1&resize=400x300"
        />
      </div>

      <Typography className={classes.userName}>
        {user.userName || "Null"}
      </Typography>

      <SimpleTabs initTab={tab} />
      <Temp userId={id} />
    </div>
  );
}

function Answer({ name }) {
  return <div>{name}</div>;
}

const Temp = (props) => {
  const tab = useQuery().get("tab");
  const userId = props.userId;
  switch (tab) {
    case "questions":
      return <Questions userId={userId} />;
    case "topics":
      return <Answer name="Chủ đề" />;
    case "friends":
      return <Answer name="Bạn bè" />;

    default:
      return <Answer name="Câu trả lời" />;
  }
};
