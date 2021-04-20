import React, { useState, useEffect } from "react";
import "quill/dist/quill.snow.css";
import { Modal } from "react-bootstrap";
import { Dialog, DialogTitle } from "@material-ui/core";
import "./modalBody.css";
import LoginModal from "./LoginModal";

export default function ModalBody(props) {
  const { show, handleClose } = props;
  const [modalType, setModalType] = useState();
  const [title, setTitle] = useState("Login");

  useEffect(() => {
    setModalType("login");
  }, []);

  const closeDialog = () => {
    handleClose();
    setModalType("login");
    setTitle("Login");
  };

  const handleRegisterClick = () => {
    setModalType("register");
    setTitle("Register");
  };

  const handleLoginClick = () => {
    setModalType("login");
    setTitle("Login");
  };

  const handleForgotClick = () => {
    setModalType("forgot");
    setTitle("Forgot Password");
  };

  return (
    <Dialog
      open={show}
      onClose={closeDialog}
      maxWidth={"lg"}
      className={
        modalType === "article" || modalType === "postQuestion"
          ? "big-modal"
          : "small-modal"
      }
    >
      <DialogTitle onClose={closeDialog}>
        <Modal.Title>{title}</Modal.Title>
      </DialogTitle>
      <LoginModal
        modalType={modalType}
        handleRegisterClick={handleRegisterClick}
        handleLoginClick={handleLoginClick}
        handleForgotClick={handleForgotClick}
      />
      {/* {modalType === "register" && <RegisterModal />} */}
    </Dialog>
  );
}
