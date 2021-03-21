import React from 'react';
import styles from './Header.module.css';
import NavigateButton from './NavigateButtons/NavigateButton';
import SearchBar from './SearchBar/SearchBar'

export default function Header(props) {
    const { onShowModal, onShowPostQuestionModal } = props;
    return (
        <nav className={`bg-white navbar-expand-lg ${styles.header} navbar navbar-expand-lg navbar-light fixed-top`}>
            <div className={`${styles.container}`}>
                <a className={styles.navbarBrand} href='http://localhost:3000'>
                    <img className={styles.logoImage} src='/logo.png' />
                </a>
                <div className='navbar-collapse collapse'>
                    <div className='navbar-collapse'>
                        <SearchBar />
                        <NavigateButton onShowModal={onShowModal} onShowPostQuestionModal={onShowPostQuestionModal} />
                    </div>
                </div>
            </div>
        </nav>
    )
}
