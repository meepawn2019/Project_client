import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { blue } from "@material-ui/core/colors";

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
  allAnswer: {
    fontSize: "16px",
    color: "#007aff",
    textAlign: "center",
    paddingTop: "1rem",
    cursor: "pointer",
  },
});

export default function Answer() {
  const { answer } = useParams();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const likeElementRef = useRef();
  const dislikeElementRef = useRef();
  const [hoverLikeStatus, setHoverLike] = useState(false);
  const [hoverDislikeStatus, setHoverDislike] = useState(false);

  const handleLikeClick = () => {
    if (liked) {
      setLiked(false);
    } else {
      setDisliked(false);
      setLiked(true);
    }
    // call api for like answer
  };
  const handleDisLikeClick = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setLiked(false);
      setDisliked(true);
    }
    // call api for dislike answer
  };

  const question = "Nên làm gì để giảm nhức đầu ngay tức thì ?";
  const classes = useStyles();
  useEffect(() => {
    compareSize();
    window.addEventListener("resize", compareSize);
  }, []);
  const date = new Date();
  const htmlString = `<span>
  <p>Một số hành động mình thường làm ngay để giảm đau đầu:</p>
  <p>-Ngưng sử dụng các thiết bị công nghệ và nằm nghỉ ngơi</p>
  <p>-Mát xa vai gáy và thái dương cùng dầu nóng</p>
  <p>-Nếu chưa giảm thì uống Tiffy và các thuốc có tác dụng giảm đau nhanh.</p>
  </span>`;
  const fakeUser = {
    avatarUrl: "/customer_avatar.png",
    userName: "Huy",
    id: "12345",
  };

  const compareSize = () => {
    const compareLike =
      likeElementRef.current.scrollWidth > likeElementRef.current.clientWidth;
    const compareDislike =
      dislikeElementRef.current.scrollWidth >
      dislikeElementRef.current.clientWidth;
    console.log("compare: ", compareLike);
    setHoverLike(compareLike);
    setHoverDislike(compareDislike);
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
                <Avatar alt={fakeUser.username} src={fakeUser.avatarUrl} />
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
            <div className="py-4">
              <div>
                <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
              </div>
            </div>
            <div>
              <Tooltip
                title={"testing"}
                interactive
                disableHoverListener={!hoverLikeStatus}
                style={{ fontSize: "2em" }}
              >
                <Button
                  dense
                  onClick={handleLikeClick}
                  style={{ width: "100px" }}
                >
                  <ThumbUpAltIcon
                    style={{
                      color: `${liked ? blue[500] : "#fff"}`,
                      marginRight: "4px",
                    }}
                    stroke={"black"}
                    stroke-width={1}
                    fontSize="large"
                  />
                  <div
                    ref={likeElementRef}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    120000000000000
                  </div>
                </Button>
              </Tooltip>
              <Tooltip
                title={"testing"}
                interactive
                disableHoverListener={!hoverDislikeStatus}
                style={{ fontSize: "2em" }}
              >
                <Button
                  dense
                  onClick={handleDisLikeClick}
                  style={{ width: "100px" }}
                >
                  <ThumbDownIcon
                    style={{
                      color: `${disliked ? blue[500] : "#fff"}`,
                      marginRight: "4px",
                    }}
                    stroke={"black"}
                    stroke-width={1}
                    fontSize="large"
                  />
                  <div
                    ref={dislikeElementRef}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    1200000000000000000000
                  </div>
                </Button>
              </Tooltip>
            </div>
            <div className={classes.allAnswer}>
              Xem&nbsp;
              <b>Tất cả</b>
              &nbsp;Câu trả lời khác
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
