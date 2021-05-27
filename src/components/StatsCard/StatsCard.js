import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "150px",
    marginTop: theme.spacing(2),
    borderRadius: "10px",
    padding: theme.spacing(3),
    backgroundColor: "#fff",
    display: "flex",
    flexWrap: "wrap",
    boxShadow: "0px 0.2em 0.4em rgb(0, 0, 0,0.6)",
    transition: "margin 0.5s ease,box-shadow 0.5s ease",
    "&:hover": {
      boxShadow: "0px 0.4em 0.5em rgb(0, 0, 0,0.8)",
      marginTop: "0.5em",
    },
  },
  left: {
    flex: "30%",
    fontSize: "30px",
    display: "flex",
    alignItems: "center",
  },
  right: {
    flex: "70%",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
  },
}));

export default function StatsCard(props) {
  const classes = useStyles();
  const { number, unit, type } = props;
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        {type === "user" ? (
          <PersonIcon style={{ fontSize: "5.1875rem" }} />
        ) : (
          <QuestionAnswerIcon style={{ fontSize: "5.1875rem" }} />
        )}
      </div>
      <div className={classes.right}>
        <span style={{ verticalAlign: "middle" }}>
          {number}
          <br></br>
          {unit}
        </span>
      </div>
    </div>
  );
}
