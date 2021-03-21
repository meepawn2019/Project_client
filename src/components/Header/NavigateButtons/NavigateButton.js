import React from 'react'
import styles from './NavigateButton.module.css'
import { Dropdown, Button } from 'react-bootstrap'

export default function NavigateButton(props) {
    return (
        <div className="my-2 my-lg-0 d-flex align-items-center justify-content-between">
            <div className='d-flex'>
                <button className={`buttonMain ${styles['button--main']} mr-2`} onClick={props.onShowPostQuestionModal}>
                    Đặt câu hỏi
                </button>
                <button className={`buttonMain ${styles['button--light']} mr-3`}>
                    Viết bài
                </button>
            </div>
            <div className='align-items-center d-flex ml-3'>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: 'gray', borderRadius: '50%', border: 'none' }}>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as="button">Đăng nhập</Dropdown.Item>
                        <Dropdown.Item as="button">Đăng ký</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div >
    )
}
