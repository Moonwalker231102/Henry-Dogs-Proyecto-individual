const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const img = "../assets/huella de perro.png";

const cleanData = (data, source) => {
    const cleanedData = data.map((bred) => {
        const cleanedItem = {
            id: bred.id,
            name: bred.name,
            image: source === "API" ? (bred.image?bred.image.url : bred.image) : img,
            temperament: bred.temperament
        }
        return cleanedItem;
    });

    return cleanedData;
};

module.exports = {
    cleanData,
};
