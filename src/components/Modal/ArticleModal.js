import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import Editor from "../Editor/Editor";

export default function ArticleModal(props) {
  const { handleClose } = props;

  const [detailArticle, setDetailArticle] = useState();

  const [formData, setFormData] = useState({});

  function handleDetailArticle(v) {
    setDetailArticle(v);
    setFormData({ ...formData, detailArticle: v });
    console.log(formData);
  }
  function onSubmitForm() {
    console.log(formData);
  }

  return (
    <div>
      <DialogContent dividers>
        <form className="article-form">
          <FormControl fullWidth={true} className="my-3">
            <InputLabel className="font-weight-bold" htmlFor="my-input">
              Tiêu đề
            </InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              label="Outlined"
              variant="outlined"
              placeholder="Tiêu đề bài viết"
            />
          </FormControl>
          <FormControl fullWidth={true} className="my-3">
            <span className="font-weight-bold">Bài viết</span>
            <Editor
              value={detailArticle || ""}
              onChange={handleDetailArticle}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <div className="text-right mt-3">
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
      </DialogActions>
    </div>
  );
}
