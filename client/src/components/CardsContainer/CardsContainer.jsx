import { useSelector } from "react-redux"
import styles from "./CardsContainer.module.css";
import Card from "../Card/Card";
import { useState } from "react";

const CardsContainer = () => {
    const dogs = useSelector(state => state.dogs);
    
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 8;
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    
    const displayedDogs = dogs.slice(startIndex, endIndex);

    const handleClickNext = () => {
        if ((currentPage * cardsPerPage) < dogs.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleClickPrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (
        <div className={styles.container}>
            {displayedDogs.map((dog) => {
                return <Card
                    key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    image={dog.image}
                    weight={`${dog.weight.min} - ${dog.weight.max}`}
                    temperament={dog.temperament}
                    created={dog.created}
                />
            })
            }
            <div className={styles.paginationButtons}>
                <button onClick={handleClickPrev} disabled={currentPage === 1}>Prev</button>
                <button onClick={handleClickNext} disabled={(currentPage * cardsPerPage) >= dogs.length}>Next</button>
            </div>
        </div>
    )
}
export default CardsContainer