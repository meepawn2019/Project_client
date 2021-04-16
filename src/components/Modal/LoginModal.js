import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  DialogContent,
} from "@material-ui/core";

export default function LoginModal() {
  const [checkedBox, setCheckedBox] = useState(false);

  const handleChange = () => {
    setCheckedBox(!checkedBox);
  };
  return (
    <div>
      <DialogContent dividers>
        <form>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              label="Outlined"
              variant="outlined"
            />
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              label="Outlined"
              variant="outlined"
              type="password"
            />
          </FormControl>
          <FormControl fullWidth={true}>
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
          <FormControl className="float-right">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="mb-3 float-right"
            >
              Đăng nhập
            </Button>
          </FormControl>
        </form>
      </DialogContent>
    </div>
  );
}
