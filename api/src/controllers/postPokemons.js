const { Pokemon, Type } = require("../db");
// const {v4: uuidv4} = require('uuid');

const postPokemons = async (req, res) => {
  try {
    const { name, image, life, attack, defense, speed, height, weight, types } =
      req.body;
    // console.log(req.body);
    if (
      !name ||
      !image ||
      !life ||
      !attack ||
      !defense ||
      !speed ||
      !height ||
      !weight ||
      !types
    ) {
      return res
        .status(404)
        .json({ message: "Faltan datos por completar en el formulario" });
    }
    const newPokemon = await Pokemon?.findOrCreate({
      where: { name },
      defaults: { image, life, attack, defense, speed, height, weight },
    });

    if (newPokemon[1] === true) {
      const existingTypes = await Type.findAll({
        where: {
          name: types,
        },
      });

      await newPokemon[0]?.setTypes(existingTypes);
      console.log(existingTypes);
      res.status(200).json(newPokemon[0]);
    } else {
      return res.status(200).json(newPokemon[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postPokemons;
