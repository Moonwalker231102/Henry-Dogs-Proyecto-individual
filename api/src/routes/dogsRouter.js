const { Router } = require("express");
const {
    getDogsHandler,
    searchHandler,
    getBreedDetailHandler,
    createBreedHandler,
} = require("../handlers/dogsHandlers");
const { validateBreed } = require("../utils/validate");
const dogsRouter = Router();




dogsRouter.get("/", getDogsHandler)

dogsRouter.get("/search", searchHandler);

dogsRouter.get("/:idRaza", getBreedDetailHandler);

dogsRouter.post("/", validateBreed, createBreedHandler);


module.exports = dogsRouter;