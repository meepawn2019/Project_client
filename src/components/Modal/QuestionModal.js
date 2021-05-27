import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormGroup,
  TextField,
  Avatar,
  Typography,
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";
// import Select from "react-select";
import NativeSelect from "@material-ui/core/NativeSelect";
import makeStyles from "@material-ui/core/styles/makeStyles";
import "./questionModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuery, gql, useMutation } from "@apollo/client";
import jwt from "jsonwebtoken";

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

const useStyles = makeStyles({
  root: {
    padding: 20,
    width: "100%",
  },
  userInfo: {
    // margin: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    margin: 10,
  },
  color: {
    backgroundColor: "blue",
  },
  autocomplete: {
    width: "90%",
    margin: 10,
  },

  question: {
    margin: 10,
    width: "90%",
  },
  buttonContainer: {
    // display: "flex",
    // flexDirection: "row",
    // alignItems: "center",
    width: "100%",
    backgroundColor: "red",
  },
  submitButton: {
    float: "right",
    backgroundColor: "orange",
    height: 50,
    padding: 10,
    margin: 10,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    "&:hover": {
      backgroundColor: "#ff6600",
    },
  },
  exitButton: {
    float: "right",
    height: 50,
    padding: 10,
    margin: 10,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
});

function QuestionModal(props) {
  const handleClose = props.handleModalClose;

const POST_QUESTION = gql`
  mutation($question: String!, $owner: ID!) {
    postQuestion(question: $question, owner: $owner) {
      id
      question
      owner {
        userName
      }
    }`
  }
;

export default function QuestionModal(props) {
  const { show, handleClose } = props;
  const [formData, setFormData] = useState({});
  const [question, setQuestion] = useState("");
  const [postQuestion] = useMutation(POST_QUESTION);

  const classes = useStyles();

  function handleQuestion(v) {
    setQuestion(v.target.value);
    setFormData({ ...formData, question: v.target.value });
  }

  function onSubmitForm() {
    const token = localStorage.getItem("token");
    try {
      jwt.verify(token, "Graphql_Hoova", function (err, decoded) {
        console.log(question);
        console.log(decoded.userId);
        postQuestion({
          variables: { question: question, owner: decoded.userId },
        })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log("ERROR in SigninBox ", { error });
          });
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog open={show} onClose={handleClose}>
      <div>
        <DialogContent>
          <form className={`${classes.center} ${classes.questionForm}`}>
            <FormGroup className="my-2 d-flex justify-content-between align-items-center flex-row">
              <div className="d-flex align-items-center">
                <img
                  height="40"
                  width="40"
                  src="/customer_avatar.png"
                  className="rounded-circle"
                  alt="avatar default"
                />
              </div>
              <div>
                <FormControl>
                  <NativeSelect>
                    {topic.map((e) => {
                      return <option key={e}>{e}</option>;
                    })}
                  </NativeSelect>
                </FormControl>
                {/* <FormControl as="select" onChange={handleTopicChange}>
                {topic.map((e) => {
                  return <option key={e}>{e}</option>;
                })}
              </FormControl> */}
              </div>
            </FormGroup>
            <FormControl fullWidth={true} className="my-3">
              <TextField
                label="Câu hỏi"
                id="my-input"
                placeholder="Bắt đầu bằng câu hỏi tại sao vì sao ..."
                onChange={handleQuestion}
              />
            </FormControl>
          </form>

          <div className={`${classes.center} text-right mt-3`}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={onSubmitForm}
              style={{
                width: "140px",
                borderColor: "rgb(241, 185, 84)",
              }}
              className="ml-1"
            >
              Tiếp
            </Button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionModal);
