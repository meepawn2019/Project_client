import React from "react";
import NavigateButton from "./NavigateButtons/NavigateButton";
import SearchBar from "./SearchBar/SearchBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    boxShadow: "0 2px 15px rgb(0 0 0 / 22%)",
  },
  container: {
    width: "100%",
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    "@media (min-width: 1200px)": {
      maxWidth: "1140px",
    },
  },
  navbarBrand: {
    display: "inline-block",
    paddingTop: ".3125rem",
    paddingBottom: ".3125rem",
    marginRight: "1rem",
    fontSize: "1.25rem",
    lineHeight: "inherit",
    whiteSpace: "nowrap",
  },
  logoImage: {
    width: "150px",
  },
});

export default function Header(props) {
  const {
    onShowModal,
    onShowPostQuestionModal,
    onShowLoginModal,
    onShowRegisterModal,
    onShowArticleModal,
  } = props;

  const classes = useStyles();
  return (
    <nav
      className={`bg-white navbar-expand-lg ${classes.header} navbar navbar-expand-lg navbar-light fixed-top`}
    >
      <div className={`${classes.container}`}>
        <a className={classes.navbarBrand} href="http://localhost:3000">
          <img className={classes.logoImage} src="/logo.png" alt="logo" />
        </a>
        <div className="navbar-collapse collapse">
          <div className="navbar-collapse">
            <SearchBar />
            <NavigateButton
              onShowModal={onShowModal}
              onShowPostQuestionModal={onShowPostQuestionModal}
              onShowLoginModal={onShowLoginModal}
              onShowRegisterModal={onShowRegisterModal}
              onShowArticleModal={onShowArticleModal}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
