import { React, useState } from "react";
import { useDispatch } from "react-redux"
import { searchDog, getDogs } from "../../redux/actions";
import styles from "./SearchBar.module.css"

const SearchBar = () => {
    const imagePath = new URL('../../assets/5509943-200.png', import.meta.url).href;
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    
    const handleInputChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        if(newSearchTerm === "") return dispatch(getDogs())
        dispatch(searchDog(newSearchTerm));
    };


    return (
        <div className={styles.SearchBar}>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleInputChange}
                className={styles.Input}
            />
            <img src={imagePath} alt="search" className={styles.search} />
        </div>
    );
};

export default SearchBar;