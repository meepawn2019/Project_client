import React, { useState, useCallback } from "react";
import Header from "../../../components/Header/Header";
import ModalBody from "../../../components/Modal/ModalBody";
import Avatar from "react-avatar";
import ProfileHeader from "./ProfileHeader";
import "./profile.css";
import CardBox from "../../../components/CardBox/CardBox";
import InfiniteScroll from "react-infinite-scroll-component";

const description = {
  question: "Câu hỏi",
  answer: "Câu trả lời",
  topic: "Chủ đề",
  article: "Bài viết",
  friend: "Bạn bè",
};

const question = [
  {
    title: "Nên chọn loại máy tính nào để học lập trình ?",
    detailQuestion:
      "<p>Hiện tại em đang là sinh viên năm nhất ngành công nghệ thông tin. Em muốn hỏi là nên chọn laptop hay desktop để học lập trình. Và trong khoảng giá bao nhiêu là phù hợp để học ạ?</p><p><img src='https://wallpaperaccess.com/full/19921.jpg' /></p>",
    author: "Huy",
    answer: "Laptop Asus Vivobook Flip giá 16.990.000đ",
    topic: "Điện tử máy móc",
    goodQuestion: 0,
    badQuestion: 0,
    comment: 0,
    like: 1,
    share: 0,
  },
  {
    title: "Nên chọn loại máy tính nào để học lập trình ?",
    detailQuestion:
      "<p>Hiện tại em đang là sinh viên năm nhất ngành công nghệ thông tin. Em muốn hỏi là nên chọn laptop hay desktop để học lập trình. Và trong khoảng giá bao nhiêu là phù hợp để học ạ?</p>",
    author: "Huy",
    answer: "Laptop Asus Vivobook Flip giá 16.990.000đ",
    topic: "Điện tử máy móc",
    goodQuestion: 0,
    badQuestion: 0,
    comment: 0,
    like: 1,
    share: 0,
  },
  {
    title: "Nên chọn loại máy tính nào để học lập trình ?",
    detailQuestion:
      "<p>Hiện tại em đang là sinh viên năm nhất ngành công nghệ thông tin. Em muốn hỏi là nên chọn laptop hay desktop để học lập trình. Và trong khoảng giá bao nhiêu là phù hợp để học ạ?</p>",
    author: "Huy",
    answer: "Laptop Asus Vivobook Flip giá 16.990.000đ",
    topic: "Điện tử máy móc",
    goodQuestion: 0,
    badQuestion: 0,
    comment: 0,
    like: 1,
    share: 0,
  },
  {
    title: "Nên chọn loại máy tính nào để học lập trình ?",
    detailQuestion:
      "<p>Hiện tại em đang là sinh viên năm nhất ngành công nghệ thông tin. Em muốn hỏi là nên chọn laptop hay desktop để học lập trình. Và trong khoảng giá bao nhiêu là phù hợp để học ạ?</p>",
    author: "Huy",
    answer: "Laptop Asus Vivobook Flip giá 16.990.000đ",
    topic: "Điện tử máy móc",
    goodQuestion: 0,
    badQuestion: 0,
    comment: 0,
    like: 1,
    share: 0,
  },
];

export default function Profile() {
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState("");
  const [currentTab, setCurrentTab] = useState("question");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onShowPostQuestionModal = () => {
    setModalTitle("Đặt câu hỏi?");
    setModalType("postQuestion");
    setShow(true);
  };

  const changeTab = useCallback((newTab) => {
    setCurrentTab(newTab);
  }, []);

  const onShowLoginModal = () => {
    setModalTitle("Đăng nhập");
    setModalType("login");
    setShow(true);
  };

  const onShowRegisterModal = () => {
    setModalTitle("Đăng ký");
    setModalType("register");
    setShow(true);
  };

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      console.log("Call api");
    }, 1500);
  };

  return (
    <div>
      <Header
        onShowModal={handleShow}
        onShowPostQuestionModal={onShowPostQuestionModal}
        onShowLoginModal={onShowLoginModal}
        onShowRegisterModal={onShowRegisterModal}
      />
      <ModalBody
        show={show}
        handleClose={handleClose}
        modalType={modalType}
        modalTitle={modalTitle}
      />
      <div className="main">
        <div className="container">
          <div className="position-relative profile">
            <div
              className="banner-header"
              style={{
                background: "url(/wp7053694.png)",
                backgroundPosition: "center top",
                backgroundSize: "cover",
              }}
            >
              <div className="update-banner">
                <input accept="image/*" hidden type="file" />
              </div>
            </div>
            <div className="avatar">
              <Avatar
                size="180"
                textSizeRatio={1.75}
                round={true}
                src="/customer_avatar.png"
              />
            </div>
            <ProfileHeader currentTab={currentTab} changeTab={changeTab} />
          </div>
          <div className="row pb-4 pt-5 pt-md-0">
            <div className="col-lg-3">
              <CardBox title="Giới thiệu" informationType={true} />
              <CardBox title="Giới thiệu" informationType={false} />
            </div>
            <div className="col-lg-6">
              <div className="d-flex justify-content-between pb-3">
                <div className="color-primary font-weight-bold">{`Tất cả ${description[currentTab]}`}</div>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <InfiniteScroll
                  dataLength={question.length}
                  next={fetchMoreData}
                  hasMore={true}
                >
                  {question.map((e, index) => {
                    return <CardBox question={e} id={index}></CardBox>;
                  })}
                </InfiniteScroll>
              </div>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
