import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    filterByCreated,
    filterByTemperament,
    getDogs,
    sortByName,
    sortByWeight,
} from "../../redux/actions";
import getTemperaments from "../../utils/getTemperaments";
import styles from "./FilterOptions.module.css";

const FilterOptions = ({ isOpen, onClose }) => {
    const [temperament, setTemperament] = useState("");
    const [isCreatedFilter, setIsCreatedFilter] = useState(false);
    const [createdFilterValue, setCreatedFilterValue] = useState("");
    const [temperaments, setTemperaments] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTemperaments = async () => {
            const data = await getTemperaments();
            setTemperaments(data);
        };
        fetchTemperaments();
    }, []);

    const handleFilterTemperament = () => {
        dispatch(filterByTemperament(temperament));
    };

    const handleFilterCreated = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === "created") {
            setCreatedFilterValue("created");
            setIsCreatedFilter(true);
            dispatch(filterByCreated(true));
        }
        if (selectedValue === "notCreated") {
            setCreatedFilterValue("notCreated");
            setIsCreatedFilter(true);
            dispatch(filterByCreated(false));
        }
        if(selectedValue === ""){
            setCreatedFilterValue("");
            dispatch(getDogs())
        }
    };

    const handleTemperamentChange = (event) => {
        const selectedTemperament = event.target.value;
        setTemperament(selectedTemperament);
    };

    const handleCleanButton = () => {
        dispatch(getDogs());
        setTemperament("");
        setIsCreatedFilter(false);
        setCreatedFilterValue("");
    };

    const handleSortByName = (ascending) => {
        dispatch(sortByName(ascending));
    };

    const handleSortByWeight = (ascending) => {
        dispatch(sortByWeight(ascending));
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button onClick={handleCleanButton}>Clear</button>
                <button onClick={() => onClose()}>x</button>
                <select value={temperament} onChange={handleTemperamentChange}>
                    <option value="">Seleccione un temperamento</option>
                    {temperaments &&
                        temperaments.map((temp) => (
                            <option key={temp.name} value={temp.name}>
                                {temp.name}
                            </option>
                        ))}
                </select>
                        <button onClick={handleFilterTemperament}>Filter by temperament</button>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="createdFilter"
                            value="created"
                            checked={createdFilterValue === "created"}
                            onChange={handleFilterCreated}
                        />
                        Created
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="createdFilter"
                            value="notCreated"
                            checked={createdFilterValue === "notCreated"}
                            onChange={handleFilterCreated}
                        />
                        No Created
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="createdFilter"
                            value=""
                            checked={createdFilterValue === ""}
                            onChange={handleFilterCreated}
                        />
                        All Breeds
                    </label>
                </div>
                <div>
                    <div>
                        <button onClick={() => handleSortByName(true)}>Sort by Name A-Z</button>
                        <button onClick={() => handleSortByName(false)}>Sort by Name Z-A</button>
                    </div>
                    <div>
                        <button onClick={() => handleSortByWeight(false)}>Sort by Weight Asc</button>
                        <button onClick={() => handleSortByWeight(true)}>Sort by Weight Desc</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterOptions;
