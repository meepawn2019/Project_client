import React from "react";
import { Form, Modal, Button } from "react-bootstrap";

export default function RegisterModal() {
  return (
    <div>
      <Modal.Body>
        <div className="p-3">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Nhập email" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Tên hiển thị" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Mật khẩu" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Nhập lại mật khẩu" />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Check
                  type="checkbox"
                  label="Tôi đồng ý với điều khoản và dịch vụ"
                ></Form.Check>
              </div>
            </Form.Group>
            <div>
              <Button
                variant="primary"
                type="submit"
                className="mb-3 float-right"
              >
                Đăng ký
              </Button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </div>
  );
}
