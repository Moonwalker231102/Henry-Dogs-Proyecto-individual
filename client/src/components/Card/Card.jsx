import { NavLink } from "react-router-dom"
import styles from "./Card.module.css"

const Card = ({id, name, image,weight, temperament, created}) => {
    return (
        <NavLink to={`/detail/${id}`} className={styles.DogCard}>
            <img src={image} alt="DogImage" className={styles.dogImage}/>
            <h2>{name}</h2>
            <h3>Weight: {weight}</h3>
            <ul className={styles.temperaments}>
                {temperament && 
                    temperament.map((temp, index) => (
                        <h3 key={index}>
                            {temp}
                        </h3>
                    ))
                }
            </ul>
            <h3>Created:{` ${created}`}</h3>
        </NavLink>
    )
}
export default Card