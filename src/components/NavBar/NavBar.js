import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import Modal from "@material-ui/core/Modal";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Edit from "@material-ui/icons/Edit";
import AskQuestion from "./AskQuestion";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import authContext from "../../../src/appContext";
import ModalBody from "../Modal/ModalBody";
import axios from "axios";
var id = "8jSppc10mmeCNVRKsSx7sKtlEch1";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    // [theme.breakpoints.down]:
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    maxWidth: 130,
    marginRight: "10px",
    marginLeft: "30px",
    marginTop: "10px",
    marginBottom: "10px",
    [theme.breakpoints.down("500")]: {
      maxWidth: 125,
      marginLeft: "10px",
      // display:'none'
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: 50,
    // color:'gray',
    backgroundColor: fade("rgb(213, 213, 213)", 0.15),
    "&:hover": {
      backgroundColor: fade("rgb(213, 213, 213)", 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {},
  inputRoot: {
    color: "inherit",
    [theme.breakpoints.down("200")]: {
      // width: "20ch",
      display: "none",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      // display:'none'
    },
    [theme.breakpoints.down("200")]: {
      // width: "20ch",
      display: "none",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalLogInShow, setModalLoginShow] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const logOut = (event) => {
    handleMenuClose();
    alert("LogOut");
  };
  const logIn = (event) => {
    handleMenuClose();
    setShow(true);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to={`/profile/${id}`}
      >
        Tài khoản của tôi
      </MenuItem>

      <MenuItem onClick={handleMenuClose} component={Link} to="/setting">
        Cài đặt
      </MenuItem>
      <MenuItem onClick={logOut}>Đăng xuất</MenuItem>
      <MenuItem onClick={logIn}>Đăng nhập</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          setModalShow(true);
          handleMobileMenuClose();
        }}
      >
        <IconButton color="inherit">
          <Edit />
        </IconButton>
        <Typography>Đặt câu hỏi</Typography>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Typography>Tài khoản</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AskQuestion
        modalShow={modalShow}
        handleClose={() => setModalShow(false)}
      />
      {/* <RealLoginModal
        modalLogInShow={modalLogInShow}
        handleLogInModalClose={handleLogInModalClose}
      /> */}
      <HideOnScroll>
        <AppBar color="default">
          <Toolbar>
            <IconButton component={Link} to="/">
              <img src="/logo.png" className={classes.logo} alt="avatar"></img>
            </IconButton>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                className={classes.searchInput}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(text) => {
                  let key = text.target.value;
                  if (key)
                    axios(`/findQuestionByKey/${key}`).then((data) =>
                      console.log(data.data)
                    );
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <MenuItem
                style={{
                  borderRadius: 30,
                  backgroundColor: fade("rgb(213, 213, 213)", 0.15),
                }}
                onClick={() => {
                  setModalShow(true);
                }}
              >
                <IconButton color="inherit">
                  <Edit />
                </IconButton>
                <Typography>Đặt câu hỏi</Typography>
              </MenuItem>

              <MenuItem
                onClick={handleProfileMenuOpen}
                style={{
                  borderRadius: 30,
                  backgroundColor: fade("rgb(213, 213, 213)", 0.15),
                }}
              >
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Typography>Tài khoản</Typography>
              </MenuItem>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {renderMobileMenu}
      {renderMenu}
      <ModalBody show={show} handleClose={handleClose} />
    </div>
  );
}
