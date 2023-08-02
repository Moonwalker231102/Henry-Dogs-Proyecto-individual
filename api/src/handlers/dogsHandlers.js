const { getAllDogs, searchFromDB, searchFromApi, getAllDogsFromDB } = require("../controllers/dogsControllers");

// ToDo Hacer una solicitud axios.get a https://api.thedogapi.com/v1/breeds como header
// ToDo sacar response.data 
// ToDo Ver cómo responde la api con esa data 
// ToDo Crear una función para limpiar la data
// ToDo Responder con la data limpia
// ToDo manejar el error
const getDogsHandler = async (req, res) => {
    try {
        const apiResponse = await getAllDogs()
        const dbResponse = await getAllDogsFromDB()
        const response = [...apiResponse, ...dbResponse]
        return res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const searchHandler = async (req, res) => {
    const {breed} = req.query;
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

module.exports = {
    getDogsHandler,
    searchHandler
}