import axios from "axios";
import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import FromData from "form-data";
import { Button, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    padding: 10,
  },
  submitButton: {
    margin: 10,
    backgroundColor: "orange",
    "&:hover": {
      backgroundColor: "#ff6600",
    },
  },
  cancelButton: {
    margin: 10,
    backgroundColor: "#f2f2f2",
    "&:hover": {
      backgroundColor: "#d9d9d9",
    },
  },
}));

function ImageCrop(props) {
  const { onClose, aspect, apiUrl, getNewUrl, getError, file } = props;

  const isAvatar = apiUrl.includes("Avatar");
  const [isChanging, setIsChanging] = useState(false);
  let form = new FromData();
  form.append("crop", "");
  form.append("file", file, file.name);
  const token = localStorage.getItem("token");

  const [src, setSrc] = useState("");
  const [crop, setCrop] = useState({
    unit: "%",
    width: 100,
    x: 0,
    y: 0,
    aspect: aspect,
  });

  const classes = useStyles();

  const reader = new FileReader();

  form.set("file", file, file.name);
  reader.addEventListener("load", () => {
    setSrc(reader.result);
  });

  reader.readAsDataURL(file);

  const onImageLoaded = (image) => {};

  const onCropChange = (crop, percentCrop) => {
    setCrop(crop);
  };

  const onCropComplete = (crop) => {
    // console.log(crop);
  };

  const onSubmit = () => {
    setIsChanging(true);
    form.set("crop", JSON.stringify(crop));
    axios
      .post(apiUrl, form, {
        headers: {
          ...form.getHeaders,
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      })
      .then(getNewUrl)
      .then(() => {
        setIsChanging(false);
        onClose();
      })
      .catch((e) => {
        getError(e);
        setIsChanging(false);
      });
  };

  return (
    <div className="ImageCrop">
      {
        <div className={classes.root}>
          <Typography variant="h3" paragraph>
            Change {isAvatar ? "Avatar" : "Cover Photo"}
          </Typography>

          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
            onChange={onCropChange}
          />
          <Button
            disabled={isChanging}
            className={classes.submitButton}
            onClick={onSubmit}
          >
            Xác nhận
          </Button>
          <Button
            disabled={isChanging}
            className={classes.cancelButton}
            onClick={onClose}
          >
            Hủy
          </Button>
        </div>
      }
    </div>
  );
}

export default ImageCrop;
