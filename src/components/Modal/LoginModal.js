import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormControlLabel,
  Checkbox,
  DialogContent,
} from "@material-ui/core";

export default function LoginModal(props) {
  const {
    handleRegisterClick,
    handleLoginClick,
    handleForgotClick,
    modalType,
  } = props;
  const [checkedBox, setCheckedBox] = useState(false);
  const handleChange = () => {
    setCheckedBox(!checkedBox);
  };
  return (
    <div>
      <DialogContent dividers>
        <form>
          <FormControl fullWidth={true} className="mb-4">
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input
              id="my-email"
              aria-describedby="my-helper-text"
              label="Outlined"
              variant="outlined"
            />
          </FormControl>
          {modalType === "register" && (
            <FormControl fullWidth={true} className="mb-4">
              <InputLabel htmlFor="my-input">Name</InputLabel>
              <Input
                id="my-name"
                aria-describedby="my-helper-text"
                label="Outlined"
                variant="outlined"
              />
            </FormControl>
          )}
          {modalType !== "forgot" && (
            <FormControl fullWidth={true} className="mb-4">
              <InputLabel htmlFor="my-input">Password</InputLabel>
              <Input
                id="my-password"
                aria-describedby="my-helper-text"
                label="Outlined"
                variant="outlined"
                type="password"
              />
            </FormControl>
          )}{" "}
          {modalType === "register" && (
            <FormControl fullWidth={true} className="mb-4">
              <InputLabel htmlFor="my-input">Re-Password</InputLabel>
              <Input
                id="my-re-password"
                aria-describedby="my-helper-text"
                label="Outlined"
                variant="outlined"
                type="password"
              />
            </FormControl>
          )}
          {modalType === "login" && (
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
          )}
          {modalType !== "forgot" && (
            <FormControl fullWidth={true}>
              <Button
                style={{ width: "150px" }}
                onClick={handleForgotClick}
              >{`Quên mật khẩu`}</Button>
            </FormControl>
          )}
          {modalType === "login" && (
            <FormControl className="mb-4 mt-4">
              <Button
                onClick={handleRegisterClick}
                variant="contained"
                color="secondary"
              >
                {`Đăng ký`}
              </Button>
            </FormControl>
          )}
          {modalType === "register" && (
            <FormControl className="mb-4 mt-4">
              <Button
                onClick={handleLoginClick}
                variant="contained"
                color="secondary"
              >
                {`Đăng nhập`}
              </Button>
            </FormControl>
          )}
          <FormControl className="float-right mb-4 mt-4">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="mb-3 float-right"
            >
              {modalType === "login" && `Đăng nhập`}
              {modalType === "register" && "Đăng ký"}
              {modalType === "forgot" && "Xác nhận quên mật khẩu"}
            </Button>
          </FormControl>
        </form>
      </DialogContent>
    </div>
  );
}
