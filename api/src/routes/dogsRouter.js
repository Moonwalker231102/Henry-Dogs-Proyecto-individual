const {Router} = require("express");
const {
    getDogsHandler,
    searchHandler,
    getBreedDetailHandler,
    createTemperamentsHandler,
    getTemperamentsHandler
} = require("../handlers/dogsHandlers");
const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler)

dogsRouter.get("/search", searchHandler);

dogsRouter.get("/temperaments", getTemperamentsHandler )

dogsRouter.get("/:idRaza", getBreedDetailHandler);

dogsRouter.post ("/temperaments",  createTemperamentsHandler);

dogsRouter.post("/", (req, res) => {
    res.send("NIY: Esta ruta permite añadir una raza de perro a la DB")
})
module.exports = dogsRouter;