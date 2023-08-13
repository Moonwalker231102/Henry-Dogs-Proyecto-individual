const { Dog } = require("../db");
const { Op } = require("sequelize");
const validateBreed = async (req, res, next) => {
    const { image, name, height, weight, life_span, temperament } = req.body
    const searchDog = await Dog.findOne({
        where: {
            name: {
                [Op.iLike]: `%${name}%`,
            },
        }
    })
    if(searchDog !== null) return res.status(400).json({error: "The dog already exist in the DB"})
        if (!image) return res.status(400).json({ error: "Missing image" })
        if (!name) return res.status(400).json({ error: "Missing name" })
        if (!height) return res.status(400).json({ error: "Missing height" })
        if (!weight) return res.status(400).json({ error: "Missing weight" })
        if (!life_span) return res.status(400).json({ error: "Missing life span" })
        if (temperament.length <= 1) return res.status(400).json({ error: "The temperaments must be at least 2" })
        next()
    
    
}

module.exports = {
    validateBreed
}