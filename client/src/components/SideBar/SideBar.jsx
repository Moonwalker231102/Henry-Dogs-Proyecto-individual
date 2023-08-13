import {React, useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import{
    filterByCreated,
    filterByTemperament,
    getDogs
} from "../../redux/actions";
import getTemperaments from "../../utils/getTemperaments";


const SideBar = () => {
    const [temperament, setTemperament] = useState("");
    const [temperaments, setTemperaments] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTemperaments = async () => {
            const data = await getTemperaments();
            setTemperaments(data);
        };
        fetchTemperaments();
    }, []);

    const handleFilterTemperament = () => {
        if (temperament) {
            dispatch(filterByTemperament(temperament));
        }
    };

    const handleTemperamentChange = (event) => {
        const selectedTemperament = event.target.value;
        setTemperament(selectedTemperament);
    };

    const handleCleanButton = () => {
        dispatch(getDogs())
        setTemperament("")
    }
    return (
        <nav>
            <button onClick={() => handleCleanButton()}>Clear</button>
            <select value={temperament} onChange={handleTemperamentChange}>
                <option value="Seleccione un temperamento">Seleccione un temperamento</option>
                {temperaments &&
                    temperaments.map((temperament) => (
                        <option key={temperament.id} value={temperament.name}>
                            {temperament.name}
                        </option>
                    ))}
            </select>
            <button onClick={handleFilterTemperament}>Filtrar</button>
        </nav>
    );
};

export default SideBar;
