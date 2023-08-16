const { 
    getAllDogs,
    searchFromDB,
    searchFromApi,
    getAllDogsFromDB,
    getBreedDetailApi,
    getBreedDetailDb,
    createBreedController
} = require("../controllers/dogsControllers");


const getDogsHandler = async (req, res) => {
    try {
        const apiResponse = await getAllDogs()
        const dbResponse = await getAllDogsFromDB()
        const response = [ ...dbResponse, ...apiResponse]
        return res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const searchHandler = async (req, res) => {
    const { breed } = req.query;
    try {
        const dbResponse = await searchFromDB(breed);
        const apiResponse = await searchFromApi(breed);
        if (!dbResponse.length && !apiResponse.length) {
            throw new Error('No se encontraron coincidencias');
        }
        res.status(200).json([...dbResponse, ...apiResponse]);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getBreedDetailHandler = async (req, res) => {
    const { idRaza } = req.params
    try {
        const apiResponse = await getBreedDetailApi(idRaza);
        const dbResponse = await getBreedDetailDb(idRaza)
        if (!dbResponse && !apiResponse) {
            throw new Error('No se encontraron coincidencias');
        }
        console.log(dbResponse)
        apiResponse ? res.status(200).json(apiResponse) : res.status(200).json(dbResponse);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const createBreedHandler = async (req, res) => {
    const {image, name, height, weight, life_span, temperament} = req.body;
    
    try {
        const createBreed = await createBreedController( image, name, height, weight, life_span, temperament);
        res.status(201).json({message: "La raza se creo correctamente: ", raza: createBreed})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    getDogsHandler,
    searchHandler,
    getBreedDetailHandler,
    createBreedHandler,
}