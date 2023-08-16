import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import getDataById from "../../utils/getDataById";
import MySvg from "../../assets/houseSvg";

const Detail = () => {
    const {id} = useParams();
    const [dogDetail , setDogDetail] = useState(null)
    useEffect(() => {
        const fetchDogData = async () => {

            const data = await getDataById(id)
            setDogDetail(data)
        };
        fetchDogData();
    },[id])


    return (
        <div>
            <NavLink to="/home">
                {MySvg}
            </NavLink>
            {dogDetail ? (
                <div>
                    <h1>Breed Name: {dogDetail.name}</h1>
                    <h2>Id: {dogDetail.id}</h2>
                    <img src={dogDetail.image.url? dogDetail.image.url: dogDetail.image} alt={dogDetail.name} />
                    <h2>Height: {dogDetail.height.metric? dogDetail.height.metric: dogDetail.height}</h2>
                    <h2>Weight: {dogDetail.weight.metric? dogDetail.weight.metric: dogDetail.weight}</h2>
                    <h2>Temperament: {dogDetail.temperament? dogDetail.temperament: dogDetail.Temperaments.map(temp => temp.name).join(", ")}</h2>
                    <h2>Lifespan: {dogDetail.life_span}</h2>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Detail;
