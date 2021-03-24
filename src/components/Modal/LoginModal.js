import React from "react";
import { Form, Modal, Button } from "react-bootstrap";

export default function LoginModal() {
  return (
    <div>
      <Modal.Body>
        <div className="p-3">
          <Form>
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
              variant="primary"
              type="submit"
              className="mb-3 float-right"
            >
              Đăng nhập
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </div>
  );
}
