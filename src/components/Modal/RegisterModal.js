import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  DialogContent,
} from "@material-ui/core";

export default function RegisterModal() {
  const [checkedBox, setCheckedBox] = useState(false);

  const handleChange = () => {
    setCheckedBox(!checkedBox);
  };

  return (
    <div>
      <DialogContent dividers>
        <form>
          <FormControl fullWidth={true} className="mb-4">
            <TextField
              id="email"
              aria-describedby="my-helper-text"
              label="Email"
              variant="outlined"
              placeholder="Email"
            />
          </FormControl>
          <FormControl fullWidth={true} className="mb-4">
            <TextField
              id="name"
              aria-describedby="my-helper-text"
              label="Tên hiển thị"
              variant="outlined"
              placeholder="Tên hiển thị"
            />
          </FormControl>
          <FormControl fullWidth={true} className="mb-4">
            <TextField
              id="password"
              aria-describedby="my-helper-text"
              label="Mật khẩu"
              variant="outlined"
              placeholder="Mật khẩu"
            />
          </FormControl>
          <FormControl fullWidth={true} className="mb-4">
            <TextField
              id="re-password"
              aria-describedby="my-helper-text"
              label="Nhập lại mật khẩu"
              variant="outlined"
              placeholder="Nhập lại mật khẩu"
            />
          </FormControl>
          <FormControl fullWidth={true} className="mb-4">
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
          </FormControl>
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="mb-3 float-right"
            >
              Đăng ký
            </Button>
          </div>
        </form>
      </DialogContent>
    </div>
  );
}
