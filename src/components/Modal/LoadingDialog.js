import React from "react";
import "quill/dist/quill.snow.css";
import { Dialog, DialogContent, CircularProgress } from "@material-ui/core";
import "./modalBody.css";

export default function LoadingDialog(props) {
  const { show } = props;

  return (
    <Dialog open={show} maxWidth={"lg"}>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
}
