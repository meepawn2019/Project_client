import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

export default function LoginModal() {
  const [checkedBox, setCheckedBox] = useState(false);

  const handleChange = () => {
    setCheckedBox(!checkedBox);
  };
  return (
    <div>
      <Modal.Body>
        <div className="p-3">
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
              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
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
          {/* <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Nhập email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Mật khẩu" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Check type="checkbox" label="Nhớ tài khoản" />
                <a href="localhost:3000/forgot-password">Quên mật khẩu</a>
              </div>
            </Form.Group>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="mb-3 float-right"
            >
              Đăng nhập
            </Button>
          </Form> */}
        </div>
      </Modal.Body>
    </div>
  );
}
