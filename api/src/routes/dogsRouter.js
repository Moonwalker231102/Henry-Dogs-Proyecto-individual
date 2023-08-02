const {Router} = require("express");
const {  getDogsHandler, searchHandler } = require("../handlers/dogsHandlers");
const dogsRouter = Router();

dogsRouter.get("/", getDogsHandler)

dogsRouter.get("/search", searchHandler);

dogsRouter.get("/:idraza", (req, res) => {
    res.send("NIY: Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con la información pedida en el detalle de un perro. el id se recibe por params, incluye los datos de los temperamentos asociados a esa raza, debe traer de la api y de la DB")
});


module.exports = dogsRouter;