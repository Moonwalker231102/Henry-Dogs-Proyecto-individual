import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";
const Landing = () => {
    return (
        <div className={styles.Landing}>
            <NavLink to="/home" className={styles.button}>
                HOME
            </NavLink>
        </div>
    )
}

export default Landing;