import React, { useState, useRef, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { blue } from "@material-ui/core/colors";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
  root: {
    width: "600px",
    backgroundColor: "#fff",
    padding: "12px",
    borderRadius: "5px",
    borderColor: "",
  },
});

export default function AnswerCard() {
  const htmlString = `<p>Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
  heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
  browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
  and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
  pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
  saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.</p>`;

  const classes = useStyles();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const likeElementRef = useRef();
  const dislikeElementRef = useRef();
  const [hoverLikeStatus, setHoverLike] = useState(false);
  const [hoverDislikeStatus, setHoverDislike] = useState(false);

  useEffect(() => {
    compareSize();
    window.addEventListener("resize", compareSize);
  }, []);

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
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Avatar
            style={{ margin: "auto" }}
            alt="avatar"
            src="/customer_avatar.png"
          />
          <div>
            {/* <IconButton aria-label="like" className={classes.margin}>
              <ThumbUpAltIcon style={{ color: green[500] }} fontSize="large" />
            </IconButton> */}
            <Tooltip
              title={"testing"}
              interactive
              disableHoverListener={!hoverLikeStatus}
              style={{ fontSize: "2em" }}
            >
              <Button dense onClick={handleLikeClick} style={{ width: "100%" }}>
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
                style={{ width: "100%" }}
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
        </Grid>
        <Grid item xs={9}>
          <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
        </Grid>
      </Grid>
    </div>
  );
}
