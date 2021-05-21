import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

import InputBase from "@material-ui/core/InputBase";

import Send from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "90vw",
    [theme.breakpoints.up(900)]: {
      width: 810,
    },
  },

  comment: {
    position: "relative",
    display: "flex",
    alignContent: "center",
    borderRadius: 50,
    backgroundColor: fade("rgb(213, 213, 213)", 0.15),
    "&:hover": {
      backgroundColor: fade("rgb(213, 213, 213)", 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
  },
  commentInput: {},
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    paddingLeft: 15,
    width: "100%",
  },
}));

export default function CommentInput() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.comment}>
      </div>
    </div>
  );
}
