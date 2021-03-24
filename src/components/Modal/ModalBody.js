import React from "react";
import "quill/dist/quill.snow.css";
import { Modal } from "react-bootstrap";
// import Editor from "../Editor/Editor";
import "./modalBody.css";
import QuestionModal from "./QuestionModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function ModalBody(props) {
  const { show, handleClose, modalType, modalTitle } = props;

  // if (modalType === "postQuestion") {
  //   return (
  //     <Modal show={show} onHide={handleClose}>
  //       <Modal.Header closeButton>
  //         <Modal.Title>{modalTitle}</Modal.Title>
  //       </Modal.Header>
  //       <QuestionModal handleClose={handleClose} />
  //     </Modal>
  //   );
  // }

  // if (modalType === "login") {
  //   return (
  //     <Modal show={show} onHide={handleClose} dialogClassName="login">
  //       <Modal.Header closeButton>
  //         <Modal.Title>{modalTitle}</Modal.Title>
  //       </Modal.Header>
  //       <LoginModal />
  //     </Modal>
  //   );
  // }

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="login">
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      {modalType === "postQuestion" && (
        <QuestionModal handleClose={handleClose} />
      )}
      {modalType === "login" && <LoginModal />}
      {modalType === "register" && <RegisterModal />}
    </Modal>
  );
}
