import React, { useState } from "react";
import FilterOptions from "../FilterOptions/FilterOptions";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const [openModal, setOpenModal] = useState(false);
    const imagePath = new URL('../../assets/filter-alt.svg', import.meta.url).href;
    const footPrintImagePath = new URL("../../assets/2091680-200.png", import.meta.url).href;
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div className={styles.Nav}>
            <NavLink to="/create" >
                <img src={footPrintImagePath} alt="" title="Create breed" className={styles.createBreedImage}/>
            </NavLink>
            <div className={styles.filterContainer}>
                <h3 className={styles.filterTitle}>Filter</h3>
                <button onClick={handleOpenModal} className={styles.filter}><img src={imagePath} alt="Filter" title="Filter options" /></button>
            </div>
            <FilterOptions isOpen={openModal} onClose={handleCloseModal} />
            <SearchBar />
        </div>
    );
};

export default NavBar;
