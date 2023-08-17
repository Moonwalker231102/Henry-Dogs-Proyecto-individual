import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import getDataById from "../../utils/getDataById";
import MySvg from "../../assets/houseSvg";
import styles from "./Detail.module.css"; // Import your CSS module

const Detail = () => {
    const { id } = useParams();
    const [dogDetail, setDogDetail] = useState(null);

    useEffect(() => {
        const fetchDogData = async () => {
            const data = await getDataById(id);
            setDogDetail(data);
        };
        fetchDogData();
    }, [id]);

    return (
        <div className={styles.detailContainer}>
            <NavLink to="/home" className={styles.backLink}>
                {MySvg}
            </NavLink>
            {dogDetail ? (
                <div className={styles.dogInfo}>
                    <h1 className={styles.breedName}>Breed Name: {dogDetail.name}</h1>
                    <h2>Id: {dogDetail.id}</h2>
                    <img
                        src={dogDetail.image.url ? dogDetail.image.url : dogDetail.image}
                        alt={dogDetail.name}
                        className={styles.dogImage}
                    />
                    <h2>Height: {dogDetail.height.metric ? dogDetail.height.metric : dogDetail.height} cm</h2>
                    <h2>Weight: {dogDetail.weight.metric ? dogDetail.weight.metric : dogDetail.weight} kg</h2>
                    <h2>Temperament: {dogDetail.temperament ? dogDetail.temperament : dogDetail.Temperaments.map(temp => temp.name).join(", ")}</h2>
                    <h2>Lifespan: {dogDetail.life_span}</h2>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Detail;
