import React, { useState } from "react";
import "quill/dist/quill.snow.css";
import { Form, Modal, Button } from "react-bootstrap";
import Select from "react-select";
import ReactQuill from "react-quill";
import styles from "./ModalBody.module.css";
// import Editor from "../Editor/Editor";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const topic = [
  "Những lĩnh vực khác",
  "hoovada.com",
  "Thai nghén & Nuôi dạy con",
  "Luật pháp & Thủ tục",
  "Xe cộ & Giao thông",
  "Mua sắm & Tiêu dùng",
  "Văn hóa trong và ngoài nước",
  "Chuyện đời tư",
  "Lĩnh vực người lớn",
  "Đầu tư kinh doanh",
  "Ngôn ngữ",
  "Điện tử &  Máy móc",
  "Con người & Tâm sinh lý",
  "Hậu cần & Xuất nhập khẩu",
  "Lịch sử & Truyền thuyết",
  "Nghệ thuật",
  "Truyền thông & Quảng cáo",
  "Tiếng lóng & Biệt ngữ",
  "Văn học",
  "Du lịch",
  "Chính trị",
  "Tôn giáo",
  "Âm nhạc & Điện ảnh",
  "Thể thao",
  "Ẩm thực",
  "Giáo dục & Việc làm",
  "Sức khỏe",
  "Công nghệ thông tin",
  "Động vật",
  "Trò chơi & Giải trí",
  "Nhà cửa & Xây dựng",
  "Tài nguyên & Môi trường",
  "Gia đình & Quan hệ xã hội",
  "Khoa học tự nhiên",
  "Khoa học xã hội và nhân văn",
];

export default function ModalBody(props) {
  const { show, handleClose, modalType, modalTitle } = props;
  const [formData, setFormData] = useState({});
  const [question, setQuestion] = useState("");
  const [detailQuestion, setDetailQuestion] = useState();
  const [tagOption, setTagOption] = useState(null);
  const [topicQuestion, setTopicQuestion] = useState("");

  function handleQuestion(v) {
    setQuestion(v);
    setFormData({ ...formData, question: v });
  }

  function handleDetailQuestion(v) {
    setDetailQuestion(v);
    setFormData({ ...formData, detailQuestion: v });
    console.log(formData);
  }

  function handleTagChange(v) {
    setTagOption(v);
    setFormData({ ...formData, tag: v });
    console.log(formData);
  }

  function onSubmitForm() {
    console.log(formData);
  }

  function handleTopicChange(v) {
    let topic = v.target.options[v.target.selectedIndex].text;
    setTopicQuestion(topic);
  }

  if (modalType === "postQuestion") {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="my-2 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img
                  height="40"
                  width="40"
                  src="/customer_avatar.png"
                  class="rounded-circle"
                />
              </div>
              <div>
                <Form.Control as="select" onChange={handleTopicChange}>
                  {topic.map((e) => {
                    return <option id={e}>{e}</option>;
                  })}
                </Form.Control>
              </div>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="font-weight-bold">
                Câu hỏi
                <span style={{ color: "#f2ba49" }}> *</span>
              </Form.Label>
              <Form.Control
                as="input"
                type="text"
                placeholder="Bắt đầu bằng câu hỏi tại sao vì sao ..."
                onChange={handleQuestion}
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="font-weight-bold">
                Chi tiết câu hỏi
              </Form.Label>
              <ReactQuill
                theme="snow"
                value={detailQuestion || ""}
                onChange={handleDetailQuestion}
                className={styles.containerQuill}
              />
              {/* <Editor
                value={detailQuestion || ""}
                onChange={handleDetailQuestion}
              /> */}
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="font-weight-bold">
                {`Thêm chủ đề trong lĩnh vực ${topicQuestion}`}
              </Form.Label>
              <Select
                defaultValue={tagOption}
                onChange={handleTagChange}
                options={options}
                isMulti={true}
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Check
                type={"checkbox"}
                id={`default-checkbox`}
                label={`Cho phép trả lời bằng hình thức thu âm`}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-right mt-3">
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ width: "80px" }}
              className="mr-2 btn-light"
            >
              Hủy
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={onSubmitForm}
              style={{
                width: "140px",
                background: "rgb(241, 185, 84)",
                borderColor: "rgb(241, 185, 84)",
              }}
              className="ml-1"
            >
              Tiếp
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }

  return <div></div>;
}
