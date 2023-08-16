import { NavLink } from "react-router-dom";
import styles from "./Landing.module.css";
import Github from "../../assets/github";
import LinkedIn from "../../assets/LinkedIn";

const Landing = () => {
    const gitHub = Github();
    const linkedIn = LinkedIn();
    return (
        <div className={styles.Landing}>
            <h1 className={styles.title}>Henry Dogs</h1>
            <NavLink to="/home" className={styles.button}>
                HOME
            </NavLink>
            <div className={styles.linksContainer}>
                <a href="https://github.com/Moonwalker231102">
                    {gitHub}
                </a>
                <a href="https://www.linkedin.com/in/esteban-jimenez-11a755258/">
                    {linkedIn}
                </a>
            </div>
        </div>
    )
}

export default Landing;