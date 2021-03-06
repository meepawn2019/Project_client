import React, { useState } from "react";
import { Link } from "react-router-dom";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
//com
import Card from "@material-ui/core/Card";
import MUILink from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
//icon
import ShareIcon from "@material-ui/icons/Share";
import MoreVert from "@material-ui/icons/MoreVert";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { Menu, MenuItem } from "@material-ui/core";
import { connect } from "react-redux";

import { deleteHomeQuestion } from "../../redux/action/homeQuestionAction";
import { deleteAnUserQuestion } from "../../redux/action/userInfoAction";

import { deleteAQuestion } from "../../redux/action/answerInQuestionAction";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90vw",
    borderRadius: 20,
    marginBottom: 15,
    position: "relative",
    [theme.breakpoints.up(900)]: {
      width: 810,
    },
  },
  topic: {
    position: "absolute",
    right: 20,
    top: 30,
  },
  avatar: {
    backgroundColor: "black[500]",
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
    backgroundColor: "rgb(245,245,245)",
  },
}));

function QuestionCard(props) {
  const {
    currentUser,
    question,
    deleteHomeQuestion,
    deleteAnUserQuestion,
    deleteAQuestion,
  } = props;
  const reload = props.reload;
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(null);

  const onClick = (event) => {
    setMenuOpen(event.currentTarget);
  };

  const handleClose = () => {
    setMenuOpen(null);
  };

  const deleteQuestionFunc = () => {
    axios
      .delete(`/deleteQuestion/${question._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        handleClose();
        deleteHomeQuestion({ id: question._id });
        deleteAnUserQuestion({
          id: currentUser._id,
          content: question._id,
        });
        deleteAQuestion({ question });
        if (reload) reload();
      });
  };

  const reportQuestion = () => {
    axios
      .post(
        "/report?type=Question",
        {
          reported: question._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      // .then((d) => console.log(d.data))
      .catch((e) => console.log(e.response));
    handleClose();
  };

  const ownerMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menuOpen}
      keepMounted
      open={Boolean(menuOpen)}
      onClose={handleClose}
    >
      <MenuItem onClick={deleteQuestionFunc}>X??a c??u h???i</MenuItem>

      {/* <MenuItem onClick={handleClose}>S???a c??u h???i</MenuItem> */}
    </Menu>
  );

  const notOwnerMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menuOpen}
      keepMounted
      open={Boolean(menuOpen)}
      onClose={handleClose}
    >
      <MenuItem onClick={reportQuestion}>B??o c??o</MenuItem>
    </Menu>
  );
  return (
    <Card className={classes.root}>
      <div className={classes.topic}>{question.topic[0]}</div>
      {currentUser._id === question.owner._id ? ownerMenu : notOwnerMenu}
      <CardHeader
        avatar={
          <MUILink component={Link} to={`/profile/${question.owner._id}`}>
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={question.owner.avatar || "../customer_avatar.png"}
            />
          </MUILink>
        }
        title={
          <MUILink component={Link} to={`/profile/${question.owner._id}`}>
            <p>{question.owner.userName}</p>
          </MUILink>
        }
        subheader={`${new Date(
          question.createAt
        ).toLocaleDateString()} ${new Date(
          question.createAt
        ).toLocaleTimeString()}`}
      />

      <MUILink component={Link} to={`/question/${question._id}`}>
        <CardContent>
          <Box className={classes.question} fontWeight="fontWeightBold">
            {question.question}
          </Box>
        </CardContent>
      </MUILink>

      <CardActions disableSpacing>
        <Tooltip title="Tr??? l???i">
          <IconButton aria-label="Comment">
            <Badge
              max={100000}
              badgeContent={question.commentCount}
              color="secondary"
            >
              <ChatBubbleIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Chia s???">
          <IconButton
            aria-label="share"
            onClick={() => {
              navigator.clipboard.writeText(
                `localhost:3000/question/${question._id}`
              );
            }}
          >
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xem th??m">
          <IconButton aria-label="more" onClick={onClick}>
            <MoreVert />
          </IconButton>
        </Tooltip>
      </CardActions>
      <Divider />
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user,
  };
};

const mapDispatchToProps = {
  deleteHomeQuestion,
  deleteAnUserQuestion,
  deleteAQuestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
