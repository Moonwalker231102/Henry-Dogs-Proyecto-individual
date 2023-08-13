const {
    getTemperaments, 
    createTemperaments
} = require("../controllers/temperamentsControllers");

const createTemperamentsHandler = async (req, res) => {
    try {
        const createdTemperaments = await createTemperaments();
        res.status(201).json({ message: 'Temperamentos creados correctamente', temperaments: createdTemperaments });
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTemperamentsHandler = async (req, res) => {
    try {
        const temperaments = await getTemperaments();
        res.status(200).json(temperaments);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    createTemperamentsHandler,
    getTemperamentsHandler
}