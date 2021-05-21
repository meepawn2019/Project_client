import { useState } from "react";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Divider,
  Typography,
  Button,
  MenuList,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    backgroundColor: "#eee",
    maxHeight: "50vh",
    width: "100%",
    overflow: "scroll",
    [theme.breakpoints.down(600)]: {
      width: 400,
      left: -175,
    },
  },
  container: {
    height: "100%",
  },
  item: {
    border: "2px solid #aaa",
  },
}));
export default function SearchQuestion(props) {
  const { loading, searchList, searchShow, onDismiss } = props;
  const classes = useStyles();

  const dismiss = () => {
    setTimeout(onDismiss, 100);
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {loading ? (
          <CircularProgress />
        ) : !searchList.length ? (
          <MenuItem>
            <Typography>Không có câu hỏi</Typography>
          </MenuItem>
        ) : (
          <MenuList>
            {searchList.map((val, index) => (
              <MenuItem
                className={classes.item}
                key={index}
                component={Link}
                to={`/question/${val._id}`}
                onClick={dismiss}
              >
                <Typography>{val.question}</Typography>
              </MenuItem>
            ))}
          </MenuList>
        )}
      </div>
    </div>
  );
}
