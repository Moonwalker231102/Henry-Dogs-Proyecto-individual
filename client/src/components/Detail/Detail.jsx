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
                    <h1>{dogDetail.name}</h1>
                    <h2>{dogDetail.id}</h2>
                    <img src={dogDetail.image.url} alt={dogDetail.name} />
                    <h2>{dogDetail.weight.metric}</h2>
                    <h2>{dogDetail.height.metric}</h2>
                    <h2>{dogDetail.temperament}</h2>
                    <h2>{dogDetail.life_span}</h2>
                    <h3>{dogDetail.create}</h3>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Detail;
