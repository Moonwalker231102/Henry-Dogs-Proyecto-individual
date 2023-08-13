const axios = require("axios")
const { temperamentCleaner } = require("../utils/cleaners");
const { Temperament } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;


const createTemperaments = async() => {
    const {data} = await axios("https://api.thedogapi.com/v1/breeds", {
        headers: {
            "x-api-key": API_KEY
        },
    })
    const cleanedData = temperamentCleaner(data);
    const createdTemperaments = await Temperament.bulkCreate(cleanedData.map(temp=> ({name: temp})));
    return createdTemperaments;
} 

const getTemperaments = async () => {
    const temperaments = await Temperament.findAll()
    if(!temperaments.length) throw new Error("No se encontraron temperamentos en la base de datos")
    return temperaments;
}

module.exports = {
    createTemperaments,
    getTemperaments
}