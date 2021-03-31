import React from "react";
import { Row } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends, faRss } from "@fortawesome/free-solid-svg-icons";

export default function ProfileHeader(props) {
  const path = useRouteMatch();
  const { currentTab, changeTab } = props;

  return (
    <Row className="controller-header">
      <div className="col-md-3 d-flex d-md-block align-items-center">
        <div className="d-flex align-items-center">
          <h4>Name</h4>
        </div>
        <div className="d-flex ml-3 mx-md-0">
          <div className="mr-lg-4 mr-2">
            <FontAwesomeIcon
              icon={faUserFriends}
              size="sm"
              className="mr-1 text-danger"
            />
          </div>
          <div className="mr-2 mr-lg-0">
            <FontAwesomeIcon
              icon={faRss}
              size="sm"
              className="mr-1 text-danger"
            />
          </div>
        </div>
        <div></div>
      </div>
      <div className="col-md-6 center-header justify-content-between">
        <div
          className={`center-item ${currentTab === "answer" && "active"}`}
          onClick={() => changeTab("answer")}
        >
          <Link to={`${path.url}/answer`} className="link">
            <div>0</div>
            <div>Câu trả lời</div>
          </Link>
        </div>
        <div
          className={`center-item ${currentTab === "question" && "active"}`}
          onClick={() => changeTab("question")}
        >
          <Link to={`${path.url}/question`} className="link">
            <div>0</div>
            <div>Câu hỏi</div>
          </Link>
        </div>
        <div
          className={`center-item ${currentTab === "article" && "active"}`}
          onClick={() => changeTab("article")}
        >
          <Link to={`${path.url}/article`} className="link">
            <div>0</div>
            <div>Bài viết</div>
          </Link>
        </div>
        <div
          className={`center-item ${currentTab === "topic" && "active"}`}
          onClick={() => changeTab("topic")}
        >
          <Link to={`${path.url}/topic`} className="link">
            <div>0</div>
            <div>Chủ đề</div>
          </Link>
        </div>
        <div
          className={`center-item ${currentTab === "friend" && "active"}`}
          onClick={() => changeTab("friend")}
        >
          <Link to={`${path.url}/friend`} className="link">
            <div>0</div>
            <div>Bạn bè</div>
          </Link>
        </div>
      </div>
    </Row>
  );
}
