const axios = require("axios")
const { cleanData } = require("../utils/cleaners");
const { Dog } = require("../db");
const { Op } = require("sequelize");
require("dotenv").config();
const { API_KEY } = process.env;

const getAllDogs = async () => {
    const { data } = await axios("https://api.thedogapi.com/v1/breeds", {
        headers: {
            "x-api-key": API_KEY
        },
    })
    const cleanedData = cleanData(data, "API");
    return cleanedData;
}
const getAllDogsFromDB = async () => {
    const dbDogs = await Dog.findAll()
    const allBreeds = cleanData(dbDogs, "DB");

    return allBreeds;
}

const searchFromDB = async (breed) => {
    const data = await Dog.findAll({
        where: {
            name: {
                [Op.iLike]: `%${breed}%`,
            },
        }
    })
    const matchingBreeds = cleanData(data, "DB");
    return matchingBreeds;
}

const searchFromApi = async (breed) => {
    const { data } = await axios(`https://api.thedogapi.com/v1/breeds`, {
        headers: {
            "x-api-key": API_KEY
        },
    })
    const regex = new RegExp(breed, 'i');
    const regexContainsSearchTerm = new RegExp('.*' + breed + '.*', 'i');

    const cleanedData = await cleanData(data, "API");
    const filterByName = cleanedData.filter((dog) => regex.test(dog.name) || regexContainsSearchTerm.test(dog.name))
    return filterByName;
}


module.exports = {
    getAllDogs,
    getAllDogsFromDB,
    searchFromDB,
    searchFromApi,

}