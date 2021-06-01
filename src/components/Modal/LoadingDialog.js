import React from "react";
import "quill/dist/quill.snow.css";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  Typography,
  Button,
} from "@material-ui/core";
import "./modalBody.css";

export default function LoadingDialog(props) {
  const { show, type, content, handleClose } = props;

  if (type === "loading") {
    return (
      <Dialog open={show} maxWidth={"lg"}>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }
  if (type === "alert") {
    return (
      <Dialog open={show} maxWidth={"lg"} onClose={handleClose}>
        <DialogContent>
          <Typography>{content}</Typography>
          <Button onClick={handleClose}>Close</Button>
        </DialogContent>
      </Dialog>
    );
  }
}
