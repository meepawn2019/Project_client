import React, { useState, useCallback } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import SimpleTabs from "./ProfileTab";
import Questions from "./questions";

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
  const user = {
    userName: "Vu Quang Huy",
  };
  const classes = useStyles();
  const path = "/profile";

  return (
    <div className={classes.root}>
      <div className={classes.coverPhoto}>
        <img
          src="/wp7053694.png"
          style={{ width: "inherit", height: "inherit" }}
        ></img>
        <Avatar
          aria-label="recipe"
          className={classes.avatar}
          src="https://cdn.dribbble.com/users/29574/screenshots/4882066/avatar_-_spider-man_-_dribbble.png?compress=1&resize=400x300"
        />
      </div>

      <Typography className={classes.userName}>{user.userName}</Typography>

      <SimpleTabs />

      <Switch>
        {/* <Route exact path={path} component={Answer} /> */}

        <Route path={`${path}`} component={Temp} />
      </Switch>
    </div>
  );
}

function Answer({ name }) {
  return <div>{name}</div>;
}

const Temp = ({ match, location }) => {
  const tab = useQuery().get("tab");
  switch (tab) {
    case "questions":
      return <Questions />;
    case "topics":
      return <Answer name="Chủ đề" />;
    case "friends":
      return <Answer name="Bạn bè" />;

    default:
      return <Answer name="Câu trả lời" />;
  }
};
// function (){

// }
// function (){

// }
// function (){

// }
