import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  home: {
    backgroundColor: "rgb(243, 243, 240)",
    paddingTop: "120px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent:'center',
    height:'100vh',
    [theme.breakpoints.down(500)]: {
      paddingTop: "90px",
    },
  },
}));

export default function Setting() {
  let text = "This is Setting Page";
  const classes = useStyles();
  return (
    <div className={classes.home}>
      <Typography>{text}</Typography>
    </div>
  );
}

