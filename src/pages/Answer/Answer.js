import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles({
  main: {
    paddingTop: "100px",
    minHeight: "100vh",
    backgroundColor: "#f5f6f8",
    height: "100%",
  },
  container: {
    maxWidth: "960px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "20px",
    paddingRight: "20px",
    "@media (min-width: 1200px)": {
      maxWidth: "1140px",
    },
  },
  root: {
    borderRadius: "10px",
    backgroundColor: "#fff",
    width: "100%",
    margin: "0px",
    padding: "20px",
  },
  title: {
    marginTop: "12px",
  },
  profileLink: {
    fontSize: "20px",
  },
});

export default function Answer() {
  const { answer } = useParams();
  const question = "Nên làm gì để giảm nhức đầu ngay tức thì ?";
  const classes = useStyles();
  useEffect(() => {
    console.log(answer);
  }, [answer]);
  const date = new Date();
  const fakeUser = {
    avatarUrl: "/customer_avatar.png",
    userName: "Huy",
    id: "12345",
  };
  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.root}>
          <div className={classes.title}>
            <Typography variant="h4" gutterBottom>
              <Link href="#">{question}</Link>
            </Typography>
          </div>
          <div>
            <div className="mt-2 d-flex justify-content-between align-items-center">
              <div className="mt-1 d-flex align-items-center mr-4 mr-md-0">
                <Avatar alt="Remy Sharp" src={fakeUser.avatarUrl} />
                <div className="ml-2">
                  <Typography variant="h5" gutterBottom className="mb-0">
                    <Link
                      className={classes.profileLink}
                      href={`localhost:3000/profile/${fakeUser.id}`}
                    >
                      {fakeUser.userName}
                    </Link>
                  </Typography>
                  <div>
                    Cập nhật lúc&nbsp;
                    <time datetime="1618903264000">{date.toString()}</time>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
