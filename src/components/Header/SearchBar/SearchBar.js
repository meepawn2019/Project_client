import React from 'react'
import styles from './SearchBar.module.css'

export default function SearchBar() {
    return (
        <div className={`mr-auto`}>
            <div style={{ position: 'relative !important' }}>
                <input className={`${styles.searchBar} mt-lg-0 mt-2`} placeholder="Tìm kiếm ..." />
            </div>
        </div>
    )
}
