const { Router } = require("express");
const getPokemonById = require("../controllers/getPokemonById");
const getAllPokemons = require("../controllers/getAllPokemons");
const getTypes = require("../controllers/getTypes");
const postPokemons = require("../controllers/postPokemons");

const router = Router();

router.get("/", getAllPokemons);
router.get("/types", getTypes);
router.get("/:id", getPokemonById);
router.post("/", postPokemons);

module.exports = router;
