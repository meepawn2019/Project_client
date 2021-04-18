import React from "react";
import "quill/dist/quill.snow.css";
import { Modal } from "react-bootstrap";
import { Dialog, DialogTitle } from "@material-ui/core";
import "./modalBody.css";
import QuestionModal from "./QuestionModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ArticleModal from "./ArticleModal";

export default function ModalBody(props) {
  const { show, handleClose, modalType, modalTitle } = props;

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      maxWidth={"lg"}
      className={
        modalType === "article" || modalType === "postQuestion"
          ? "big-modal"
          : "small-modal"
      }
    >
      <DialogTitle onClose={handleClose}>
        <Modal.Title>{modalTitle}</Modal.Title>
      </DialogTitle>
      <QuestionModal handleClose={handleClose} />
      {/* {modalType === "login" && <LoginModal />}
      {modalType === "register" && <RegisterModal />}
      {modalType === "article" && <ArticleModal handleClose={handleClose} />} */}
    </Dialog>
  );
}
