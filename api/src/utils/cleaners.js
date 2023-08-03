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

const temperamentCleaner = (data) => {
    const cleanedDataRaw = data.map(breed => breed.temperament)
    const separateWords = cleanedDataRaw
    .filter(str => str)
    .flatMap(str => str.split(", "));
    const cleanedData = separateWords.filter((word, index, arr) => arr.indexOf(word) === index);
    cleanedData.sort();
    return cleanedData
}

module.exports = {
    cleanData,
    temperamentCleaner
};
