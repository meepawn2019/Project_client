import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import {
  faInfoCircle,
  faVenusMars,
  faBirthdayCake,
  faCalendarAlt,
  faUsers,
  faRss,
} from "@fortawesome/free-solid-svg-icons";
import ExpandCollapse from "react-expand-collapse";
import "./cardBox.css";

export default function CardBox(props) {
  const {
    title,
    informationType,
    userInformation,
    followedTopic,
    question,
  } = props;

  const fakeTopic = [
    {
      title: "Văn học cổ điển",
      follower: 1,
    },
  ];

  const fakeUserInformation = {
    bio: "Toi la huy",
    gender: "Nam",
    date_of_birth: "13/11/1969",
    created_at: "29/03/2021",
  };

  if (informationType) {
    return (
      <div>
        <div className="card-box">
          <div className="header-left-card d-flex justify-content-between">
            {title}
            <img
              alt="edit-infor"
              src="/edit.png"
              className="ml-2 cursor-pointer"
              style={{ width: "20px", height: "20px" }}
            />
          </div>
          <div className="px-3 py-2 color-black">
            <FontAwesomeIcon icon={faInfoCircle} size="sm" className="mr-2" />
            {fakeUserInformation.bio}
          </div>
          <div className="px-3 py-2 color-black">
            <FontAwesomeIcon icon={faVenusMars} size="sm" className="mr-2" />
            {fakeUserInformation.gender}
          </div>
          <div className="px-3 py-2 color-black">
            <FontAwesomeIcon icon={faBirthdayCake} size="sm" className="mr-2" />
            {fakeUserInformation.date_of_birth}
          </div>
          <div className="px-3 py-2 color-black">
            <FontAwesomeIcon icon={faCalendarAlt} size="sm" className="mr-2" />
            {`Tham gia từ ${fakeUserInformation.created_at}`}
          </div>
        </div>
      </div>
    );
  }

  if (question) {
    return (
      <div className="card-box border-card-box ribbon-box p-0">
        <div className="card-body p-0 question--card-body">
          <div className="d-flex p-4">
            <div>
              <div className="mr-3">
                <img
                  alt="avatar-small"
                  src="/customer_avatar.png"
                  style={{ weight: "40px", height: "40px" }}
                />
              </div>
            </div>
            <div className="w-100">
              <h4>
                <a className="question-title" href="localhost:3000">
                  {question.title}
                </a>
              </h4>
              <div className="html-render">
                <span
                  dangerouslySetInnerHTML={{
                    __html: question.detailQuestion,
                  }}
                />
              </div>
              <div>
                Hỏi bởi&ensp;
                <a className="font-weight-bold" href="https://google.com">
                  {question.author}
                </a>
              </div>
              {/* <div className="pt-3 w-100"></div> */}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgb(221, 221, 221)" }}>
            <div className="question-bottom align-items-baseline align-items-lg-center d-flex flex-column flex-lg-row-reverse justify-content-between px-4 py-2">
              <Button className="float-right"> Trả lời</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="card-box">
        <div className="header-left-card">{title}</div>
        {fakeTopic &&
          fakeTopic.map((e) => {
            return (
              <div className="p-3">
                <div className="d-flex align-items-center mt-2">
                  <img
                    alt="topic-logo"
                    src="/topic_logo.jpg"
                    className="rounded-circle"
                    style={{ width: 40, height: 40 }}
                  />
                  <div className="ml-2 w-100">
                    <h5 className="mb-1 user-title">
                      <a href="/profile" className="user-title">
                        {e.title}
                      </a>
                    </h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <FontAwesomeIcon
                          icon={faUsers}
                          size="sm"
                          className="mr-2"
                        />
                        {e.follower}
                      </div>
                      <div
                        className="ml-2 card-box--card-feed-text cursor-pointer"
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon icon={faRss} size="sm" />
                        <span className="ml-1">Bỏ theo dõi</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
