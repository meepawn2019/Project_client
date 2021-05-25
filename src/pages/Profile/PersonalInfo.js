import axios from "axios";
import { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  home: {
    display: "flex",
    flexDirection: "column",
  },
  box: {
    border: "1px solid",
    padding: 10,
  },
}));

export default function Questions(props) {
  const classes = useStyles();

  const user = props.user;
  //   useEffect(() => console.log(user));
  return (
    <div className={classes.home}>
      <Box className={classes.box}>
        <Typography>Email: {user.email}</Typography>
      </Box>
      <Box className={classes.box}>
        <Typography>
          Ngày sinh: {new Date(user.birth).toLocaleDateString()}
        </Typography>
      </Box>

      <Box className={classes.box}>
        <Typography>Giới tính: {user.gender}</Typography>
      </Box>
      <Box className={classes.box}>
        <Typography>Bio: {user.bio}</Typography>
      </Box>
      <Box className={classes.box}>
        <Typography>
          Tham gia: {new Date(user.createAt).toLocaleDateString()}
        </Typography>
      </Box>
    </div>
  );
}
