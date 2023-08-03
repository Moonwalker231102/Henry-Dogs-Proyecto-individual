const axios = require("axios")
const { cleanData, temperamentCleaner } = require("../utils/cleaners");
const { Dog, Temperament } = require("../db");
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



const getBreedDetailApi = async (idRaza) => {
    const idParsed = +idRaza
    const {data} = await axios(`https://api.thedogapi.com/v1/breeds`, 
    {
            headers: {
                "x-api-key": API_KEY
            },
    }
    );
    const breedDetail = await data.filter((breed) => breed.id === idParsed);
    return breedDetail[0];
}



const getBreedDetailDb = async (idRaza) =>  {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    const test = uuidRegex.test(idRaza);
    if(test === false) return"No se encontraron coincidencias";
    const response = await Dog.findAll({where: {id: idRaza}})
    return response[0];
}



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
    getAllDogs,
    getAllDogsFromDB,
    searchFromDB,
    searchFromApi,
    getBreedDetailApi,
    getBreedDetailDb,
    createTemperaments,
    getTemperaments
}