import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  container: {
    maxWidth: "960px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  root: {
    borderRadius: "10px",
    backgroundColor: "#fff",
    maxWidth: "800px",
    top: "100px",
    position: "absolute",
    width: "100%",
  },
});

export default function Answer() {
  const { answer } = useParams();
  const question = "TEST";
  const classes = useStyles();
  useEffect(() => {
    console.log(answer);
  }, [answer]);
  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          <Link href="#">{question}</Link>
        </Typography>
      </div>
    </div>
  );
}
