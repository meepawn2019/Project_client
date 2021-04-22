import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  FormControlLabel,
  Checkbox,
  Select,
} from "@material-ui/core";
// import Select from "react-select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Editor from "../Editor/Editor";
import makeStyles from "@material-ui/core/styles/makeStyles";
import "./questionModal.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
];

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "100px",
  },
  center: {
    width: "80%",
    marginLeft: "10%",
  },
  questionForm: {
    "& .ql-editor": {
      minHeight: "300px !important",
      maxHeight: "300px",
      overflow: "hidden",
      overflowY: "scroll",
    },
  },
});

export default function QuestionModal(props) {
  const { handleClose } = props;
  const [formData, setFormData] = useState({});
  const [question, setQuestion] = useState("");
  const [detailQuestion, setDetailQuestion] = useState();
  const [tagOption, setTagOption] = useState(null);
  const [topicQuestion, setTopicQuestion] = useState("");

  const [checkedBox, setCheckedBox] = useState(false);

  const classes = useStyles();

  const handleChange = () => {
    setCheckedBox(!checkedBox);
  };

  function handleQuestion(v) {
    setQuestion(v.target.value);
    setFormData({ ...formData, question: v.target.value });
  }

  function handleDetailQuestion(v) {
    setDetailQuestion(v);
    setFormData({ ...formData, detailQuestion: v });
  }

  function handleTagChange(v) {
    setTagOption(v);
    setFormData({ ...formData, tag: v });
  }

  function onSubmitForm() {
    console.log(formData);
  }

  function handleTopicChange(v) {
    let topic = v.target.options[v.target.selectedIndex].text;
    setTopicQuestion(topic);
  }

  return (
    <div className={classes.root}>
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
          <InputLabel className="font-weight-bold" htmlFor="my-input">
            Câu hỏi
          </InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            label="Outlined"
            variant="outlined"
            placeholder="Bắt đầu bằng câu hỏi tại sao vì sao ..."
            onChange={handleQuestion}
          />
        </FormControl>

        <FormControl fullWidth={true} className="my-3">
          <span className="font-weight-bold">Chi tiết câu hỏi</span>

          {/* <ReactQuill
              theme="snow"
              value={detailQuestion || ""}
              onChange={handleDetailQuestion}
            /> */}
          <Editor
            value={detailQuestion || ""}
            onChange={handleDetailQuestion}
          />
        </FormControl>
        {/* <FormControl fullWidth={true} className="my-3">
          <span className="font-weight-bold" htmlFor="my-input">
            {`Thêm chủ đề trong lĩnh vực ${topicQuestion}`}
          </span>
          <Select
            defaultValue={tagOption}
            onChange={handleTagChange}
            options={options}
            multiple
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
          />
        </FormControl> */}
        {/* <FormControl fullWidth={true} className="my-3">
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedBox}
                onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Ghi nhớ mật khẩu"
          />
        </FormControl> */}
      </form>
      <div className={`${classes.center} text-right mt-3`}>
        <Button
          variant="contained"
          onClick={handleClose}
          style={{ width: "80px" }}
          className="mr-2 btn-light"
        >
          Hủy
        </Button>
        <Button
          variant="contained"
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
    </div>
  );
}
