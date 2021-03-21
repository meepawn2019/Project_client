import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ModalBody from "../../components/Modal/ModalBody";

export default function Home() {
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onShowPostQuestionModal = () => {
    setModalTitle("Đặt câu hỏi?");
    setModalType("postQuestion");
    setShow(true);
  };

  return (
    <div>
      <Header
        onShowModal={handleShow}
        onShowPostQuestionModal={onShowPostQuestionModal}
      />
      <ModalBody
        show={show}
        handleClose={handleClose}
        modalType={modalType}
        modalTitle={modalTitle}
      />
    </div>
  );
}
