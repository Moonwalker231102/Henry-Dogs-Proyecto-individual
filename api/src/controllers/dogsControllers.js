const axios = require("axios")
const { cleanData } = require("../utils/cleaners");
const { Dog, Temperament} = require("../db");
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
    const dbDogs = await Dog.findAll({
        include: Temperament,
    });
    const allBreeds = cleanData(dbDogs, "DB");

    return allBreeds;
}



const searchFromDB = async (breed) => {
    const data = await Dog.findAll({
        where: {
            name: {
                [Op.iLike]: `%${breed}%`,
            },
        },
        include: Temperament, // This includes the Temperament association
    });

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


const createBreedController = async (image, name, height, weight, life_span, temperament) => {
    const createdDog = await Dog.create({
        image,
        name,
        height,
        weight,
        life_span,
        temperament
    })
    const temperaments = await Promise.all(
        temperament.map(await (temp => {
            return Temperament.findOrCreate({where: {name: temp}})
        } ))
    )
    await createdDog.addTemperaments(temperaments.map(t => t[0]));
    return createdDog
}

module.exports = {
    getAllDogs,
    getAllDogsFromDB,
    searchFromDB,
    searchFromApi,
    getBreedDetailApi,
    getBreedDetailDb,
    createBreedController
}