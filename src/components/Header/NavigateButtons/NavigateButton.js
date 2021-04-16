import React, { useState, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const useStyles = makeStyles({
  buttonMain: {
    backgroundColor: "#f2ba49",
    border: "1px solid #efefef",
    color: "#fff",
    width: "160px",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#992420",
    },
  },
  buttonLight: {
    background: "#fff",
    border: "1px solid #f2ba49",
    color: "#f2ba49",
    "&:hover": {
      background: "#f2f2f2",
    },
  },
});

export default function NavigateButton(props) {
  const {
    onShowPostQuestionModal,
    onShowLoginModal,
    onShowRegisterModal,
    onShowArticleModal,
  } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="my-2 my-lg-0 d-flex align-items-center justify-content-between">
      <div className="d-flex">
        <button
          className={`buttonMain ${classes.buttonMain} mr-2`}
          onClick={onShowPostQuestionModal}
        >
          Đặt câu hỏi
        </button>
        <button
          className={`buttonMain ${classes.buttonLight} mr-3`}
          onClick={onShowArticleModal}
        >
          Viết bài
        </button>
      </div>
      <div className="align-items-center d-flex ml-3">
        <IconButton
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          className={classes.margin}
          size="small"
        >
          <ArrowDownwardIcon fontSize="inherit" />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={onShowLoginModal}>Login</MenuItem>
                    <MenuItem onClick={onShowRegisterModal}>Register</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
